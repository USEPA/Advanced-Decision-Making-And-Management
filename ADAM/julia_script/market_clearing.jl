# Yicheng Hu
# 2019-04 supply chain design modeling and optimization


using DelimitedFiles
using JuMP
#using Cbc
using Dates
using Printf
using Ipopt

IR = 0.1
NY = 20
R = 6335.439;
M = 1e10

Input = ARGS;
#Input = [node, sup, dem, site, prod, tech, alpha, dis, id]

IR = 0.1
NY = 20
R = 6335.439;
M = 1e10

Input = ARGS;
#Input = [node, sup, dem, site, prod, tech, alpha, dis, id]

# Define the path of each file
#=node_path = Input[1]
sup_path = Input[2]
dem_path = Input[3]
site_path = Input[4]
prod_path = Input[5]
tech_path = Input[6]
alpha_path = Input[7]
dis_path = Input[8]
cand_path = Input[9]
id = Input[10]
username = Input[11]
userid = Input[12]=#

#transfolder = "media/"*userid*"_"*username*"/task_"*id*"/";

folder = "media/"
userid = Input[2]
username = Input[3]
id = Input[4]

node_path = folder*userid*"_"*username*"/task_"*id*"/node_data.csv"
sup_path = folder*userid*"_"*username*"/task_"*id*"/sup_data.csv"
dem_path = folder*userid*"_"*username*"/task_"*id*"/dem_data.csv"
site_path = folder*userid*"_"*username*"/task_"*id*"/site_data.csv"
prod_path = folder*userid*"_"*username*"/task_"*id*"/prod_data.csv"
tech_path = folder*userid*"_"*username*"/task_"*id*"/tech_data.csv"
alpha_path = folder*userid*"_"*username*"/task_"*id*"/alpha_data.csv"
cand_path = folder*userid*"_"*username*"/task_"*id*"/cand_data.csv"
dis_path = "media/Geo"

transfolder = folder*userid*"_"*username*"/task_"*id*"/";

try

# Read data
node_matrix = readdlm(node_path,',');
supply_matrix = readdlm(sup_path,',');
demand_matrix = readdlm(dem_path,',');
site_matrix = readdlm(site_path,',');
prod_matrix = readdlm(prod_path,',');
technology_matrix = readdlm(tech_path,',');
alpha_matrix = readdlm(alpha_path,',');

# Define sets
NODES = node_matrix[2:end,1]; # all nodes
PRODS = prod_matrix[2:end,1] # all products
DEMS  = demand_matrix[2:end,1] # all demands
SUPS  = supply_matrix[2:end,1] # all supply matrix
TECHS = technology_matrix[2:end,1] # all available technologies
TECH_PRVD = site_matrix[2:end,1] # all existing technologies

# node properties
node_alia = Dict(zip(NODES, node_matrix[2:end,2])); # node alias
node_lat = Dict(zip(NODES, node_matrix[2:end,3])); # node latitude (degree)
node_long  = Dict(zip(NODES, node_matrix[2:end,4])); # node longitude (degree)

# product properties
prod_name = Dict(zip(PRODS, prod_matrix[2:end,2])); # product names
prod_trans= Dict(zip(PRODS, prod_matrix[2:end,3])); # product transportation cost ($/tonne/km)

# Dictionary of transport matrix
prod_transmatrix = Dict((NODES[1], NODES[1], PRODS[1]) => "N");
for pr in PRODS
    trans_matrix = readdlm(transfolder*"transmatrix_"*pr*".csv",',');
    for ii in 1:length(NODES)
        for jj in 1:length(NODES)
            prod_transmatrix[NODES[ii], NODES[jj], pr] = trans_matrix[ii,jj];
        end
    end
end


# custormer properties
dem_node  = Dict(zip(DEMS, demand_matrix[2:end,2])); # demand locations
dem_prod  = Dict(zip(DEMS, demand_matrix[2:end,3])); # demand products
dem_price = Dict(zip(DEMS, demand_matrix[2:end,4])); # demand price ($/tonne)
dem_cap   = Dict(zip(DEMS, demand_matrix[2:end,5])); # demand capacities (tonne/year)

# supplier properties
sup_node  = Dict(zip(SUPS, supply_matrix[2:end,2])); # supply locations
sup_prod  = Dict(zip(SUPS, supply_matrix[2:end,3])); # supply products
sup_price = Dict(zip(SUPS, supply_matrix[2:end,4])); # supply price ($/tonne)
sup_cap   = Dict(zip(SUPS, supply_matrix[2:end,5])); # supply capacities (tonne/year)

# technology properties
tech_capmin  = Dict(zip(TECHS, technology_matrix[2:end,3])); # technology minimum capacities with regard to the reference product (tonne/year)
tech_capmax  = Dict(zip(TECHS, technology_matrix[2:end,4])); # technology maximum capacities with regard to the reference product (tonne/year)
tech_refprod = Dict(zip(TECHS, technology_matrix[2:end,5])); # technology reference products
tech_K_inv   = Dict(zip(TECHS, technology_matrix[2:end,6])); # technology investment costs - slope ($/tonne/year)
tech_B_inv   = Dict(zip(TECHS, technology_matrix[2:end,7])); # technology investment costs - constant ($)
tech_K_op    = Dict(zip(TECHS, technology_matrix[2:end,8])); # technology operational costs - slope ($/tonne)
tech_B_op    = Dict(zip(TECHS, technology_matrix[2:end,9])); # technology operational costs - constant ($/year)

# technology provider properties
tp_site = Dict(zip(TECH_PRVD, site_matrix[2:end,2])); # node location of the existing technologies
tp_tech = Dict(zip(TECH_PRVD, site_matrix[2:end,3])); # technology type
tp_cap  = Dict(zip(TECH_PRVD, site_matrix[2:end,4])); # technology capacity
tp_indicator = Dict(zip(TECH_PRVD, ones(length(TECH_PRVD)))); # technology indicator

# the yield factors
transfer = Dict((TECHS[1],PRODS[1]) => 0.5);
for i in 1:length(TECHS)
    for k in 1: length(PRODS)
        transfer[(TECHS[i], PRODS[k])] = alpha_matrix[i,k];
    end
end

if dis_path == "media/Geo"
# distance between nodes (using the Haversine formula/existing data)
    distance = Dict((NODES[1], NODES[2]) => 0.5);
    for ii in 1:length(NODES)
        for jj in 1:length(NODES)
        i = NODES[ii];
        j = NODES[jj];
        distance[(i,j)] = 2*R*asin(sqrt(sin((node_lat[j] - node_lat[i])*pi/2/180)^2 + cos(node_lat[j]*pi/180)*cos(node_lat[i]*pi/180)*sin((node_long[j] - node_long[i])*pi/2/180)^2));
        end
    end
elseif dis_path == "media/Euc"
    distance = Dict((NODES[1], NODES[2]) => 0.5);
    for ii in 1:length(NODES)
        for jj in 1:length(NODES)
        i = NODES[ii];
        j = NODES[jj];
        distance[(i,j)] = sqrt((node_lat[j]-node_lat[i])^2 + (node_long[j]-node_long[i])^2)
        end
    end
else
    distance = Dict((NODES[1], NODES[2]) => 0.5);
    distance_matrix = readdlm(dis_path,',');
    for i in 1:length(NODES)
        for j in 1:length(NODES)
            distance[(NODES[i],NODES[j])] = distance_matrix[i+1,j+1];
        end
    end
end
## Modeling
m = Model(with_optimizer(Ipopt.Optimizer, max_cpu_time = 3600));

# product flows
@variable(m, f[NODES,NODES,PRODS]>= 0);

# demand and supply
@variable(m, dem[DEMS] >= 0);
@variable(m, d[NODES,PRODS] >= 0);
@variable(m, sup[SUPS] >= 0);
@variable(m, s[NODES,PRODS] >= 0);

# technology site
@variable(m, y[TECHS, NODES]);

# generated/consumed amount by technologies
@variable(m, x[NODES,PRODS,TECHS]);
@variable(m, p[NODES, PRODS]);

@constraint(m, techflow[i in NODES, t in TECHS], x[i,tech_refprod[t],t] <= 0);

# transportation cost and operational cost
@variable(m,transcost);
@variable(m,opcost);
@variable(m,demrevn);
@variable(m,supcost);
@variable(m,totalcost);

# social welfare
@variable(m, swf)

@constraint(m, flow[ii in NODES, jj in NODES, pr in PRODS], f[ii,jj,pr] <= (prod_transmatrix[(ii,jj,pr)]==="Y")*M)

# demand and supply
@constraint(m, demeq[n in NODES, pr in PRODS], d[n,pr] == sum(dem[dd] for dd in DEMS if dem_prod[dd]==pr && dem_node[dd]==n));
@constraint(m, supeq[n in NODES, pr in PRODS], s[n,pr] == sum(sup[ss] for ss in SUPS if sup_prod[ss]==pr && sup_node[ss]==n));

# balance and conversion constraints
@constraint(m, balance[i in NODES, pr in PRODS],s[i,pr]+p[i,pr]+sum(f[j,i,pr] for j in NODES) == sum(f[i,j,pr] for j in NODES)+d[i,pr]);
@constraint(m, process[i in NODES, pr in PRODS], p[i,pr] == sum(x[i,pr,t] for t in TECHS));
@constraint(m, transfer_pr[i in NODES, t in TECHS, pr in PRODS], x[i,pr,t] == transfer[t,pr]/transfer[t,tech_refprod[t]]*x[i,tech_refprod[t],t]);

# technology capacity constraints
@constraint(m, techcaplb[i in NODES, t in TECHS], -x[i,tech_refprod[t],t] >= y[t,i]*tech_capmin[t]);
@constraint(m, techcapub[i in NODES, t in TECHS], -x[i,tech_refprod[t],t] <= y[t,i]*tech_capmax[t]);

# existing technologies
@constraint(m, siteeq[i in NODES, t in TECHS], y[t,i] == sum(tp_indicator[tp] for tp in TECH_PRVD if tp_site[tp] == i &&
                tp_tech[tp] == t));
@constraint(m, existingtechcap[i in TECH_PRVD], -x[tp_site[i],tech_refprod[tp_tech[i]],tp_tech[i]] <= tp_cap[i]);

# demand and supply capacity
@constraint(m, demand_cap[i in DEMS], dem[i] <= dem_cap[i]);
@constraint(m, supply_cap[i in SUPS], sup[i] <= sup_cap[i]);

# Economics
@constraint(m, opcost == sum((-x[i,tech_refprod[t],t]*tech_K_op[t] + y[t,i]*tech_B_op[t]) for i in NODES for t in TECHS));
@constraint(m, transcost == sum(prod_trans[pr]*distance[i,j]*f[i,j,pr] for i in NODES for j in NODES for pr in PRODS));
@constraint(m, demrevn == sum(dem[i]*dem_price[i] for i in DEMS));
@constraint(m, supcost == sum(sup[i]*sup_price[i] for i in SUPS));
@constraint(m, totalcost == opcost + transcost - demrevn + supcost);

@constraint(m, swf == -totalcost)
@objective(m, Max, swf);

## Solve the model
optimize!(m);

#print(has_duals(m))
#print(dual_status(m))

π = Dict((NODES[1],PRODS[1]) => 0.5);
for i in NODES
    for pr in PRODS
        π[(i,pr)] = dual.(m[:balance][i,pr]);
    end
end

# count players
ns = sum(value.(m[:sup][ss]) >= 0.01 for ss in SUPS)
nd = sum(value.(m[:dem][dd]) >= 0.01 for dd in DEMS)
ntr = sum(value.(m[:f][i,j,pr]) >= 0.01 for i in NODES for j in NODES for pr in PRODS)
ntp = sum(value.(m[:x][tp_site[tp],tech_refprod[tp_tech[tp]],tp_tech[tp]]) <= -0.01 for tp in TECH_PRVD);
#for tp in TECH_PRVD
#    if value.(m[:x][tp_site[tp],tech_refprod[tp_tech[tp]],tp_tech[tp]]) <= -0.01
#        ntp = ntp + 1;
#    end
#end

# calculate market players' profits
ϕs = zeros(length(SUPS),1);
ϕs = Dict(zip(SUPS,ϕs));
for ss in SUPS
    ϕs[ss] = value.(m[:sup][ss])*sum(π[i,pr] - sup_price[ss] for i in NODES for pr in PRODS
                    if sup_node[ss] == i && sup_prod[ss] == pr);
end

ϕd = zeros(length(DEMS),1);
ϕd = Dict(zip(DEMS,ϕd));
for dd in DEMS
    ϕd[dd] = value.(m[:dem][dd])*sum(dem_price[dd] - π[i,pr] for i in NODES for pr in PRODS
                    if dem_node[dd] == i && dem_prod[dd] == pr);
end

ϕl = Dict((NODES[1], NODES[2],PRODS[1]) => 0.5)
for i in NODES
    for j in NODES
        for pr in PRODS
            ϕl[i,j,pr] = value.(m[:f][i,j,pr])*sum(π[j,pr] - π[i,pr]
                            - prod_trans[pr]*distance[i,j]);
        end
    end
end

ϕt = zeros(length(TECH_PRVD),1);
ϕt = Dict(zip(TECH_PRVD,ϕt));
for tp in TECH_PRVD
    ϕt[tp] = sum(π[tp_site[tp],pr]*value.(m[:x][tp_site[tp],pr,tp_tech[tp]]) for pr in PRODS) +
                    value.(m[:x][tp_site[tp],tech_refprod[tp_tech[tp]],tp_tech[tp]])*tech_K_op[tp_tech[tp]];
end


open("julia_task_results/results_summary_"*string(id)*".csv", "w") do rp
    println(rp,"Solving time",",", "$(Dates.year(now()))-$(Dates.month(now()))-$(Dates.day(now())) $(Dates.hour(now())):$(Dates.minute(now()))");
    println(rp,"Total social welfare (million USD/year)",",");
    @printf(rp,"%0.2f",value.(m[:swf]))
    println(rp)

    println(rp,"Total revenue (million USD/year)",",");
    @printf(rp,"%0.2f",value.(m[:demrevn]))
    println(rp)

    println(rp,"Total supply cost (million USD/year)",",");
    @printf(rp,"%0.2f",value.(m[:supcost]))
    println(rp)

    println(rp,"Total transportation cost (million USD/year)",",");
    @printf(rp,"%0.2f",value.(m[:transcost]))
    println(rp)

    println(rp,"Total technology cost (million USD/year)",",");
    @printf(rp,"%0.2f",value.(m[:opcost]))
    println(rp)

    println(rp,"Total supplier profit (million USD/year)",",");
    @printf(rp,"%0.2f",sum(ϕs[ss] for ss in SUPS))
    println(rp)

    println(rp,"Total customer profit (million USD/year)",",");
    @printf(rp,"%0.2f",sum(ϕd[dd] for dd in DEMS))
    println(rp)

    println(rp,"Total transportation provider profit (million USD/year)",",");
    @printf(rp,"%0.2f",sum(ϕl[i,j,pr] for i in NODES for j in NODES for pr in PRODS))
    println(rp)

    println(rp,"Total technology provider profit (million USD/year)",",");
    @printf(rp,"%0.2f",sum(ϕt[tp] for tp in TECH_PRVD))
    println(rp)
end

for pp in PRODS
    open("julia_task_results/flow_results_"*"$(pp)"*"_"*string(id)*".csv", "w") do ff
        print(ff,",")
        for j in NODES # Prints the header with node index
            print(ff,j,",")
        end
        println(ff) # Used to enter next line
        for j in NODES # Prints the 1st row entry i.e. the sender node
            print(ff,j,",")
            for k in NODES # Prints the flow value from node j to node k with product p
                print(ff,value.(f[j,k,pp]),",")
            end
            println(ff)
        end
    end
end

println("----------Printing clearing prices----------");
open("julia_task_results/clearing_prices"*"_"*string(id)*".csv", "w") do cp
    print(cp,",")
    for pr in PRODS # Prints the header with product index
        print(cp,pr,",")
    end
    println(cp,"") # Used to enter next line
    for i in NODES
        print(cp,i,",") # Prints the node locations
        for pr in PRODS # Prints the clearing price of product pr at node i
            print(cp,π[i,pr],",")
        end
        println(cp)
    end
end

catch e
    #bt = backtrace()
    #msg = sprint(showerror, e, bt)
    msg = sprint(showerror, e)
    open("julia_task_results/error_info_"*string(id)*".csv", "w") do pr
        println(pr,"Solving time",",", "$(Dates.year(now()))-$(Dates.month(now()))-$(Dates.day(now())) $(Dates.hour(now())):$(Dates.minute(now()))");
        println(pr,"ERROR Reported",",","True")
        println(pr,msg)
    end
end

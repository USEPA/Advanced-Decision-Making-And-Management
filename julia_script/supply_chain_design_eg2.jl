# Yicheng Hu
# 2019-10 supply chain design modeling and optimization - example 2 in the online tutoriala

using DelimitedFiles
using JuMP
using Cbc
using Dates
using Printf
#using Gurobi

IR = 0.1
NY = 20
R = 6335.439;
M = 1e10

Input = ARGS;
#Input = [node, sup, dem, site, prod, tech, alpha, dis, trans0, trans1, trans2, trans3, trans4, trans5, id]


# Define the path of each file
node_path = Input[1]
sup_path = Input[2]
dem_path = Input[3]
site_path = Input[4]
cand_path = Input[5]
prod_path = Input[6]
tech_path = Input[7]
alpha_path = Input[8]
id = Input[9]

#try

    # Read data
    node_matrix = readdlm(node_path,',');
    supply_matrix = readdlm(sup_path,',');
    demand_matrix = readdlm(dem_path,',');
    site_matrix = readdlm(site_path,',');
    prod_matrix = readdlm(prod_path,',');
    technology_matrix = readdlm(tech_path,',');
    alpha_matrix = readdlm(alpha_path,',');
    cand_matrix = readdlm(cand_path,',');

    # Define sets
    NODES = node_matrix[2:end,1]; # all nodes
    PRODS = prod_matrix[2:end,1] # all products
    DEMS  = demand_matrix[2:end,1] # all demands
    SUPS  = supply_matrix[2:end,1] # all supply matrix
    TECHS = technology_matrix[2:end,1] # all available technologies
    TECH_PRVD = site_matrix[2:end,1] # all existing technologies
    TECH_CAND = cand_matrix[2:end,1] # all technology candidates

    # node properties
    #node_alia = Dict(zip(NODES, node_matrix[2:end,2])); # node alias
    node_lat = Dict(zip(NODES, node_matrix[2:end,2])); # node latitude (degree)
    node_long  = Dict(zip(NODES, node_matrix[2:end,3])); # node longitude (degree)

    # product properties
    prod_name = Dict(zip(PRODS, prod_matrix[2:end,2])); # product names
    prod_trans= Dict(zip(PRODS, prod_matrix[2:end,3])); # product transportation cost ($/tonne/km)


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

    # technology candidate properties
    cd_site = Dict(zip(TECH_CAND, cand_matrix[2:end,2])); # node location of tech candidates
    cd_tech = Dict(zip(TECH_CAND, cand_matrix[2:end,3])); # technology type

    # the yield factors
    transfer = Dict((TECHS[1],PRODS[1]) => 0.5);
    for i in 1:length(TECHS)
        for k in 1: length(PRODS)
            transfer[(TECHS[i], PRODS[k])] = alpha_matrix[i,k];
        end
    end


    # distance between nodes (using the Haversine formula/existing data)
        distance = Dict((NODES[1], NODES[2]) => 0.5);
        for ii in 1:length(NODES)
            for jj in 1:length(NODES)
            i = NODES[ii];
            j = NODES[jj];
            distance[(i,j)] = 2*R*asin(sqrt(sin((node_lat[j] - node_lat[i])*pi/2/180)^2
                    + cos(node_lat[j]*pi/180)*cos(node_lat[i]*pi/180)*sin((node_long[j]
                            - node_long[i])*pi/2/180)^2));
            end
        end

    ## Modeling
    m = Model(with_optimizer(Cbc.Optimizer, seconds = 3600));

    # product flows
    @variable(m, f[NODES,NODES,PRODS]>= 0);

    # demand and supply
    @variable(m, dem[DEMS] >= 0);
    @variable(m, d[NODES,PRODS] >= 0);
    @variable(m, sup[SUPS] >= 0);
    @variable(m, s[NODES,PRODS] >= 0);

    # technology site
    @variable(m, y[TECHS, NODES], Bin);

    # generated/consumed amount by technologies
    @variable(m, x[NODES,PRODS,TECHS]);
    @variable(m, p[NODES, PRODS]);

    @constraint(m, techflow[i in NODES, t in TECHS], x[i,tech_refprod[t],t] <= 0);

    # transportation cost and operational cost
    @variable(m,invcost >= 0)
    @variable(m,transcost >= 0);
    @variable(m,opcost >= 0);
    @variable(m,demrevn);
    @variable(m,supcost);
    @variable(m,totalcost);

    # social welfare
    @variable(m, swf)

    # demand and supply
    @constraint(m, demeq[n in NODES, pr in PRODS], d[n,pr] == sum(dem[dd] for dd in DEMS if dem_prod[dd]==pr && dem_node[dd]==n));
    @constraint(m, supeq[n in NODES, pr in PRODS], s[n,pr] == sum(sup[ss] for ss in SUPS if sup_prod[ss]==pr && sup_node[ss]==n));

    # balance and conversion constraints
    @constraint(m, balance[i in NODES, pr in PRODS],s[i,pr]+p[i,pr]+sum(f[j,i,pr] for j in NODES) == sum(f[i,j,pr] for j in NODES)+d[i,pr]);
    @constraint(m, process[i in NODES, pr in PRODS], p[i,pr] == sum(x[i,pr,t] for t in TECHS));
    @constraint(m, transfer_pr[i in NODES, t in TECHS, pr in PRODS], x[i,pr,t] == transfer[t,pr]/transfer[t,tech_refprod[t]]*x[i,tech_refprod[t],t]);

    # technology capacity constraints
    #@constraint(m, techcaplb[i in NODES, t in TECHS], -x[i,tech_refprod[t],t] >= y[t,i]*tech_capmin[t]);
    @constraint(m, techcaplb[i in NODES, t in TECHS], -x[i,tech_refprod[t],t] >= 0);
    @constraint(m, techcapub[i in NODES, t in TECHS], -x[i,tech_refprod[t],t] <= y[t,i]*tech_capmax[t]);

    # existing technologies
    @constraint(m, existingtech[i in TECH_PRVD], y[tp_tech[i],tp_site[i]] == 1);
    @constraint(m, existingtechcap[i in TECH_PRVD], -x[tp_site[i],tech_refprod[tp_tech[i]],tp_tech[i]] <= tp_cap[i]);

    # technology candidate
    @constraint(m, techcand[n in NODES, t in TECHS], y[t,n] <= 0.01 + sum(1 for cc in TECH_CAND if cd_site[cc] == n && cd_tech[cc] == t) + sum(1 for tt in TECH_PRVD if tp_site[tt] == n && tp_tech[tt] == t));

    # demand and supply capacity
    @constraint(m, demand_cap[i in DEMS], dem[i] <= dem_cap[i]);
    @constraint(m, supply_cap[i in SUPS], sup[i] <= sup_cap[i]);

    # Economics
    @constraint(m, invcost == IR*(1+IR)^NY/((1+IR)^NY - 1)*(sum((-x[i,tech_refprod[t],t]*tech_K_inv[t] + y[t,i]*tech_B_inv[t]) for i in NODES for t in TECHS)
                                - sum((-x[tp_site[i],tech_refprod[tp_tech[i]],tp_tech[i]]*tech_K_inv[tp_tech[i]] + tech_B_inv[tp_tech[i]]) for i in TECH_PRVD))); # exclude the investment of existing technologies
    @constraint(m, opcost == sum((-x[i,tech_refprod[t],t]*tech_K_op[t] + y[t,i]*tech_B_op[t]) for i in NODES for t in TECHS));
    @constraint(m, transcost == sum(prod_trans[pr]*distance[i,j]*f[i,j,pr] for i in NODES for j in NODES for pr in PRODS));
    @constraint(m, demrevn == sum(dem[i]*dem_price[i] for i in DEMS));
    @constraint(m, supcost == sum(sup[i]*sup_price[i] for i in SUPS));
    @constraint(m, totalcost == invcost + opcost + transcost - demrevn + supcost);


    @constraint(m, swf == -totalcost)
    @objective(m, Max, swf);

    ## Solve the model
    optimize!(m);

open("media/public/results_summary_"*string(id)*".csv", "w") do pr
    println(pr,"Solving time",",", "$(Dates.year(now()))-$(Dates.month(now()))-$(Dates.day(now())) $(Dates.hour(now())):$(Dates.minute(now()))");
    println(pr,"Total social welfare (million USD/year)",",")
    @printf(pr,"%0.2f",value.(swf))
    println(pr)

    println(pr,"Total revenue (million USD/year)",",")
    @printf(pr,"%0.2f",value.(demrevn))
    println(pr)

    println(pr,"Total supply cost (million USD/year)",",")
    @printf(pr,"%0.2f",value.(supcost))
    println(pr)

    println(pr,"Total transportation cost (million USD/year)",",")
    @printf(pr,"%0.2f",value.(transcost))
    println(pr)

    println(pr,"Total technology operational cost (million USD/year)",",")
    @printf(pr,"%0.2f",value.(opcost))
    println(pr)

    println(pr,"Total annulized investment cost (million USD/year)",",")
    @printf(pr,"%0.2f",value.(invcost))
end

for pp in PRODS
    open("media/public/flow_results_"*"$(pp)"*"_"*string(id)*".csv", "w") do ff
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

open("media/public/tech_results_"*string(id)*".csv", "w") do tf
    println(tf, "Node", ",", "Tech", ",", "Capacity")
    for i in NODES
        for t in TECHS
            if value.(y[t,i]) >= 0.1
                println(tf, i, ",", t, ",", value.(-x[i,tech_refprod[t],t]))
            end
        end
    end
end

open("media/public/site_results_"*string(id)*".csv", "w") do tf
    println(tf, "Node", ",", "Tech", ",", "Amount")
    for tp in TECH_PRVD
        println(tf, tp_site[tp], ",", tp_tech[tp], ",", value.(-x[tp_site[tp],tech_refprod[tp_tech[tp]],tp_tech[tp]]))
    end
end

#=catch e

    msg = sprint(showerror, e)
    open("media/public/error_info_"*string(id)*".csv", "w") do pr
        println(pr,"Solving time",",", "$(Dates.year(now()))-$(Dates.month(now()))-$(Dates.day(now())) $(Dates.hour(now())):$(Dates.minute(now()))");
        println(pr,"ERROR Reported",",","True")
        println(pr,msg)
    end
end=#

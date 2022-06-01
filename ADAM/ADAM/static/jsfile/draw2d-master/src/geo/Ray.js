import draw2d from '../packages'


/**
 * @class
 * Represents a vector within 2-dimensional Euclidean space.
 * 
 * @inheritable
 * @extends draw2d.geo.Point
 * @author Andreas Herz
 */
draw2d.geo.Ray = draw2d.geo.Point.extend(
    /** @lends draw2d.geo.Ray.prototype */
    {
    
    NAME: "draw2d.geo.Ray",
    
    /**
     * Creates a ray object.
     *
     * @param {Number} x
     * @param {Number} y
     */
    init: function( x, y)
    {
        this._super(x,y);
    },
    
    
    isHorizontal: function()
    {
       return this.x != 0;
    },
    
    similarity: function( otherRay)
    {
       return Math.abs(this.dot(otherRay));
    },
    
    getAveraged: function( otherRay)
    {
        return new draw2d.geo.Ray((this.x + otherRay.x) / 2, (this.y + otherRay.y) / 2);
    }

});

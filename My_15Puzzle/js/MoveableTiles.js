class MoveableTiles
{
    constructor($blank_space)
    {
        this.space = $blank_space;
        this.row = parseInt(space.attr('id').substr(0, 1), 10);
        this.column = parseInt(space.attr('id').substr(1, 1), 10);
        
        this.above = this.row === 1 ? null : $('#' + (this.row - 1) + this.column.toString());
        this.below = this.row === n ? null : $('#' + (this.row + 1) + this.column.toString());
        this.right = column === n ? null : $('#' + row.toString() + (column + 1));
        this.left = column === 1 ? null : $('#' + row.toString() + (column - 1));
                
        var surroundings = [above, below, right, left];
        var moveableTiles = surroundings.filter(function(value) {
            return value !== null;
        });
    }
}
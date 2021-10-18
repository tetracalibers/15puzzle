// タイルの生成
class TileMaker
{
    constructor(n, nn)
    {
        this.n = n;
        this.nn = nn;
        this.dice = new Dice(this.nn);
        this.numbers = dice.makeArray();
    }
    
    make()
    {
        var index = 0;
        
        for (var i = 1; i <= n; i++) {
            for (var j = 1; j <= n; j++) {
                var tile = $('<div></div>')
                            .addClass('tile')
                            .attr('id', i.toString() + j.toString())
                            .text(this.numbers[index])
                            .appendTo('.container');
                            
                if (this.numbers[index] === nn) {
                    tile.text('').addClass('blank_space');
                }
                
                index++;
            }
        }
    }
}
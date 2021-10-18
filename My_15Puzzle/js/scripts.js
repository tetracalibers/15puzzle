$(function(){
    var n = 4;
    var nn = n * n;
    var s = 1; // スペースの数(2以上は未対応)
    
    // 乱数生成クラス（抽象化拡張サイコロ）
    function Dice(max) 
    {
        this.max = max;
        
        // 乱数を生成するメソッド
        this.play = function() 
        {
            return Math.round(Math.random() * this.max);
        }
        
        // 重複しない乱数を詰めた配列を生成するメソッド
        this.makeArray = function() 
        {
            var array = [];
            
            while (array.length < this.max) {
                var number = this.play();
                if (!array.includes(number) && number !== 0) {
                    array.push(number);
                }
            }
            
            return array;
        }
    }
    
    // タイルの生成を行うメソッド
    function makeTiles()
    {
        var dice = new Dice(nn);
        var numbers = dice.makeArray();
        var index = 0;
        
        for (var i = 1; i <= n; i++) {
            for (var j = 1; j <= n; j++) {
                var tile = $('<div></div>')
                            .addClass('tile')
                            .attr('id', i.toString() + j.toString())
                            .text(numbers[index])
                            .appendTo('.container');
                            
                if (numbers[index] >= nn + 1 - s) {
                    tile.text('').addClass('blank_space');
                }
                
                index++;
            }
        }
    }
    
    // 動かせるタイルに関する情報を集めたメソッド
    function getMoveableTiles($blank_space)
    {
        var space = $blank_space;
        var row = parseInt(space.attr('id').substr(0, 1), 10);
        var column = parseInt(space.attr('id').substr(1, 1), 10);
        
        var above = row === 1 ? null : $('#' + (row - 1) + column.toString());
        var below = row === n ? null : $('#' + (row + 1) + column.toString());
        var right = column === n ? null : $('#' + row.toString() + (column + 1));
        var left = column === 1 ? null : $('#' + row.toString() + (column - 1));
                
        var surroundings = [above, below, right, left];
        var moveableTiles = surroundings.filter(function(value) {
            return value !== null;
        });
        
        return moveableTiles;
    }
    
    // 動かせるタイルを強調するメソッド
    function highlightMoveableTiles(moveableTiles)
    {
        $('.moveable').removeClass('moveable');
        for (var value of moveableTiles) {
            value.addClass('moveable');
        }
    }
        
    // タイルを動かすメソッド
    function moveTile(clicked, space, counter) 
    {
        counter++;
        $('.counter').text('現在' + counter + '手');
        
        $('.moveable').off();
        var $this = clicked;
        $this.velocity({opacity: 0});
        space.velocity({opacity: 1});
        space.text($this.text());
        var space = $this;
        var moveableTiles = getMoveableTiles($this);
        highlightMoveableTiles(moveableTiles);
        for (var i = 0; i < moveableTiles.length; i++) {
            moveableTiles[i].click(function() {
                moveTile($(this), space, counter);
            });
        }
    }
    
    // 初期化メソッド
    function init() 
    {
        makeTiles();
        var counter = 0;
        $('<div></div>').addClass('counter').text('現在' + counter + '手').appendTo('.container');
        
        var space = $('.blank_space');
        space.css('opacity', 0);
        var moveableTiles = getMoveableTiles(space);
        highlightMoveableTiles(moveableTiles);
        
        for (var i = 0; i < moveableTiles.length; i++) {
            moveableTiles[i].click(function() {
                moveTile($(this), space, counter);
            });
        }
    }    
    
    init();
});
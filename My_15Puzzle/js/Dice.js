// 乱数生成クラス（抽象化拡張サイコロ）
class Dice
{
    constructor(max)
    {
        this.max = max;
    }
    
    // 乱数を生成するメソッド
    play()
    {
        return Math.round(Math.random() * this.max);
    }
    
    // 重複しない乱数を詰めた配列を生成するメソッド
    makeArray()
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
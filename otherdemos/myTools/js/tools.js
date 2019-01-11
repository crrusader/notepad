/**
 *  @author anonymous_bhl
 *  @name cc
 *
 */

;var cc = {};
(function (cc,doc,window) {
    // 预留位置传其他对象进这个区域
    // document传入内部变为doc
    // 将cc方法挂载到window对象上
    window.cc = cc;
    // if ( typeof module === "object" && typeof module.exports === "object" ) {
    //     module.exports = 1;
    //     console.log(1);
    // }else{
    //     cc = 1;
    //     console.log(2);
    // }
    // 判断数据类型
    // 判断是否为数组
    /**
     * @return boolean
     */
    cc.isArrayFn = function(obj){
        if (typeof Array.isArray === "function") {
            return Array.isArray(obj); //浏览器支持则使用isArray()方法
        }else{                     //否则使用toString方法
            return Object.prototype.toString.call(obj) === "[object Array]";
        }
    }

    //删除左右两端的空格
    cc.trim = function(str){
　　     return str.replace(/(^\s*)|(\s*$)/g, "");
　　 }

    // 找出当前节点的所有兄弟节点，包括自己
    /**
     * @return nodes
     */
    cc.siblings = function(elem){
        var allNodes = [];
        var cryElem = elem;
        if(elem.nodeType !== 1)return '"'+ elem + '"'+ ' is not a node!';
        // 找到所有后面的兄弟，加入数组
        while (elem.nextElementSibling !== null) {
            allNodes.push(elem.nextElementSibling);
            elem = elem.nextElementSibling;
        }
        // 将自己也加入数组
        allNodes.unshift(cryElem);
        // 将之前的兄弟也加入数组
        while (cryElem.previousElementSibling !== null) {
            allNodes.unshift(cryElem.previousElementSibling);
            cryElem = cryElem.previousElementSibling;
        }
        return allNodes;
    }

    // 在数组中查找指定类名的,并不能查找其他,比较low,只能输入className,不带.(例如.cls输入cls)
    /**
     * @return js-object
     */
    cc.findCls = function(arr,cryClassName) {
        if(!cc.isArrayFn(arr))return 'not an Array!';
        var imp = [];
        for (var i = 0; i < arr.length; i++) {
            var avr = arr[i].className.split(' ');
            for(var j = 0;j<avr.length;j++){
                if(avr[j] === cryClassName){
                    return document.querySelector('.' + avr[j]);
                }
            }
        }
    }

    // addClass
    /**
     * @main 目前只能加一个class
     */
    cc.addClass = function (obj,cls) {
        var clsName = obj.className.split(' ');
        var str = '';
        for (var i = 0; i < clsName.length; i++) {
            if(clsName[i] === cls){
                return;
            }
        }
        clsName.push(cls);
        for (var i = 0; i < clsName.length; i++) {
            str += clsName[i] + " ";
        }
        str = cc.trim(str);
        obj.className = str;
    }

    // toggleClass
    /**
     * @main 目前只能加一个class
     */
    cc.toggleClass = function (obj,cls) {
        var clsName = obj.className.split(' ');
        var str = '';
        for (var i = 0; i < clsName.length; i++) {
            if(clsName[i] === cls){
                clsName.splice(i,1);
                str = clsName.join(" ");
                str = cc.trim(str);
                obj.className = str;
                return ;
            }
        }
        clsName.push(cls);
        str = clsName.join(" ");
        str = cc.trim(str);
        obj.className = str;
    }

    // removeClass
    /**
     * @main 移除一个指定的className
     */
     cc.removeClass = function (obj,cls) {
         var clsName = obj.className.split(' ');
         var str = '';
         for (var i = 0; i < clsName.length; i++) {
             if(clsName[i] === cls){
                 clsName.splice(i,1);
                 str = clsName.join(" ");
                 str = cc.trim(str);
                 obj.className = str;
                 return obj;
             }
         }
     }

     /**
      * 模块用了jq语法，需要替换
      * 换图，img结构要加上data-img-src,懒加载需要在最后附上lazy-src路径
      */
      cc.imageResize = function(attr) {
        var w = $(window).width() + $.spice.getScrollbarWidth();
        $.each($('img[' + attr + ']'), function(i, elem) {
            var $img = $(elem),
                data = $.parseJSON($img.attr(attr));
            $img.data('data-default-src', $img.attr('lazy-src') || $img.attr('src'));
            if (data) {
                var dataDefaultSrc = $img.data('data-default-src'),
                    pc = data.pc,
                    ipad = data.ipad,
                    mobile = data.mobile,
                    src = pc;
                if (w < 1025) {
                    src = ipad || pc || dataDefaultSrc;
                }
                if (w < 768) {
                    src = mobile || pc || dataDefaultSrc;
                }
                if (!src) {
                    src = ipad || mobile || dataDefaultSrc;
                }
                if ($img.attr('src') != src) {
                    $img.attr('src', src);
                    // 如需懒加载，attr相应的key
                    // $img.attr('lazy-src', src);
                }
            }
        });
      }

    return cc;
})(cc,document,window)

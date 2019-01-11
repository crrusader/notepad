document.addEventListener('DOMContentLoaded', function() {
    // 下拉框展开收起
    document.querySelector('.events-dropdown>.btn').onclick = function(){
        var _self = this;
        // console.log(cc.siblings(_self));
        // console.log(cc.siblings(_self)[1].className === 'sub-menu tinyscrollbar');
        cc.toggleClass(cc.findCls(cc.siblings(_self),'sub-menu'),'block');
        // title显示隐藏的内容
        // 给文字显示处固定的宽度
    }
    var lis = document.querySelectorAll('.events-dropdown>.sub-menu li');
    // 给每一个li绑定一个点击事件
    for(var i = 0;i < lis.length;i++){
        lis[i].onclick = function () {
            var obj = this.parentNode.parentNode.parentNode.parentNode;
            var liText = this.children[0].innerText;
            var textNumber = document.querySelector('.events-dropdown>.btn>.dropdown-text');
            cc.removeClass(obj,'block');
            textNumber.innerHTML = ' ' + liText + ' ';
        }
    }
})

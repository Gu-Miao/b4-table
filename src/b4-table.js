function Table() {

    // 当前显示的表体，即 body 部分的数据
    this.dataRendering = [];

    // 当前页数
    this.pageNum = 1;

    // 传入的数据
    this.data = {};

    // 实例化表格的容器 div 选择器字符串
    this.selectorStr = '';

    // 表头字符串数组
    this.head = [];

    // 是否需要分页
    this.isPageNecessary = false;
}

// 初始化表格
Table.prototype.init = function (selectorStr, data) {

    // 载入数据
    this.initData(selectorStr, data);

    // 绘制表格
    this.render();
}

// 更新表格
Table.prototype.update = function (bodyData) { // 只包括 body 部分

    // 更新数据
    this.updateData(bodyData);

    // 绘制表格
    this.render();
}

// 绘制表格
Table.prototype.render = function () {

    layer.msg('加载中...', {
        icon: 16,
        shade: 0.01,
        time: 0
    });

    // 绘制表头
    let $thead = this.renderHead();

    // 绘制表体
    let $tbody = this.renderBody();

    // 绘制分页器
    let $page = this.renderPager();

    // 声明组件
    let $table = $('<table class="table table-hover table-bordered rounded"></table>');
    let $tableContainer = $('<div class="table-responsive"></talbe>');

    // 在表格中添加组件
    $table.append($thead).append($tbody);

    // 表格容器
    $tableContainer.append($table);
    $(this.selectorStr).empty().addClass('b4-table m-3').append($tableContainer).append($page);

    // 关闭 layer
    layer.closeAll();
}


// 分页
Table.prototype.renderPager = function () {

    if (this.isPageNecessary) {
        let $page = $('<div class="b4-page clearfix"></div>');
        let total = Math.ceil(this.data.body.length / 10);
        let $pager = this.pagerDOM(total);

        $page.append($pager);

        return $page;
    }

    return null;
}

// 分页器结构
Table.prototype.pagerDOM = function (total) {

    let that = this;
    let $pager = $(`
        <div class="b4-pager">
        <div class="btn-toolbar">
        <div class="btn-group">
        <button type="button" class="btn btn-outline-primary">首页</button>
        <button type="button" class="btn btn-outline-primary">上一页</button>
        <div class="input-group">
        <span>当前第</span>
        <input type="number" step="1" min="1" max="${total}" class="form-control p-0" value="${this.pageNum}">
        <span>页，共 ${total} 页</span>
        </div>
        <button type="button" class="btn btn-outline-primary">下一页</button>
        <button type="button" class="btn btn-outline-primary">末页</button>
        </div>
        </div>
        </div>`
    );

    $pager.find('button:eq(0)').prop('disabled', false);
    $pager.find('button:eq(1)').prop('disabled', false);
    $pager.find('button:eq(2)').prop('disabled', false);
    $pager.find('button:eq(3)').prop('disabled', false);

    if (this.pageNum == 1) {
        $pager.find('button:eq(0)').prop('disabled', true);
        $pager.find('button:eq(1)').prop('disabled', true);
    } else if (this.pageNum == total) {
        $pager.find('button:eq(2)').prop('disabled', true);
        $pager.find('button:eq(3)').prop('disabled', true);
    }

    let keepPageNum = function() {
        $(this).val(that.pageNum);
    };

    let pageTurn = function (event) {

        if (event.keyCode == 13) {

            let pageNum = Number($(this).val());

            if (pageNum > total || pageNum < 1) {
                layer.msg('请输入合法数值！', { icon: 5, time: 2000 });
            } else {
                that.pageNum = pageNum;
                that.dataRendering = that.deepSave(that.data.body).slice((pageNum - 1) * 10, pageNum * 10);
                that.render();
            }
        }
    };

    let toFirst = function () {
        that.pageNum = 1;
        that.dataRendering = that.deepSave(that.data.body).slice((that.pageNum - 1) * 10, that.pageNum * 10);
        that.render();
    };

    let previous = function () {
        that.pageNum = Number($pager.find('input[type="number"]').val()) - 1;
        that.dataRendering = that.deepSave(that.data.body).slice((that.pageNum - 1) * 10, that.pageNum * 10);
        that.render();
    };

    let next = function () {
        that.pageNum = Number($pager.find('input[type="number"]').val()) + 1;
        that.dataRendering = that.deepSave(that.data.body).slice((that.pageNum - 1) * 10, that.pageNum * 10);
        that.render();
    };

    let toLast = function () {
        that.pageNum = total;
        that.dataRendering = that.deepSave(that.data.body).slice((that.pageNum - 1) * 10, that.data.body.length);
        that.render();
    };

    $pager.find('input[type="number"]').keydown(pageTurn).blur(keepPageNum);
    $pager.find('button:eq(0)').click(toFirst);
    $pager.find('button:eq(1)').click(previous);
    $pager.find('button:eq(2)').click(next);
    $pager.find('button:eq(3)').click(toLast);

    return $pager;
}

// 绘制表体
Table.prototype.renderBody = function () {

    let $tbody = $('<tbody></tbody>');
    let data = [];

    if (this.isPageNecessary) {
        data = this.deepSave(this.dataRendering);
    } else {
        data = this.deepSave(this.data.body);
    }

    // 初始化表格内容
    for (let i = 0; i < data.length; ++i) {
        let $tr = $('<tr></tr>');
        for (let j = 0; j < this.head.length; ++j) {
            $tr.append($('<td>' + (data[i][this.head[j].field]) + '</td>'));
        }
        $tbody.append($tr);
    }

    return $tbody;
}

// 绘制表头
Table.prototype.renderHead = function () {
    let $thead = $('<thead><tr></tr></thead>');

    // 初始化表头
    for (let i = 0; i < this.head.length; ++i) {
        $thead.find('tr').append($('<th>' + (this.head[i].title) + '</th>'));
    }

    return $thead;
}

// 更新数据
Table.prototype.updateData = function (data) {
    this.data.body = this.deepSave(data);
    this.pageNum = 1;

    this.isPageNecessary = (data.length > 10 ? true : false);
    if (this.isPageNecessary) {
        this.dataRendering = this.deepSave(data).slice(0, 10);
    } else {
        this.dataRendering = [];
    }
}

// 初始化数据
Table.prototype.initData = function (selectorStr, data) {
    this.selectorStr = selectorStr;
    this.data = this.deepSave(data);

    for (let i = 0; i < data.head.length; ++i) {
        this.head.push(data.head[i]);
    }

    this.isPageNecessary = (data.body.length > 10 ? true : false);
    if (this.isPageNecessary) {
        this.dataRendering = this.deepSave(data.body).slice(0, 10);
    } else {
        this.dataRendering = [];
    }
}

// 深拷贝存储
Table.prototype.deepSave = function (obj) {
    return JSON.parse(JSON.stringify(obj));
}
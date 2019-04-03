function Table() {

    this.option = {
        caption: '',        // 表头
        head: [
            {
                field: '',  // 表头别名，传数据使用
                title: ''   // 显示内容
            }
        ],
        body: [
            {
                'field': 'value'       // 键值对
            }
        ]
    };
}

Table.prototype.init = function (selectorStr, option) {

    // 声明组件
    let $table = $('<table class="table table-hover table-bordered rounded-bottom table-rounded"></table>');
    let $caption = $('<caption>' + option.caption + '</caption>');
    let $thead = $('<thead><tr></tr></thead>');
    let $tbody = $('<tbody></tbody>');
    let $tableContainer = $('<div class="table-responsive"></talbe>');

    // 声明表头数组
    let headArray = [];

    // 初始化表头
    for (let i = 0; i < option.head.length; ++i) {
        headArray.push(option.head[i].field);
        $thead.find('tr').append($('<th>' + (option.head[i].title) + '</th>'));
    }

    // 初始化表格内容
    for (let i = 0; i < option.body.length; ++i) {
        let $tr = $('<tr></tr>');
        for (let j = 0; j < headArray.length; ++j) {
            $tr.append($('<td>' + (option.body[i][headArray[j]]) + '</td>'));
        }
        $tbody.append($tr);
    }

    // 在表格中添加组件
    $table.append($caption);
    $table.append($thead);
    $table.append($tbody);

    // 表格容器
    $tableContainer.append($table);
    $(selectorStr).addClass('b4-table m-3').append($tableContainer);
}
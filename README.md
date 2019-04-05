# b4-table

An extended Bootstrap table based on boostrap4 and layer.

## dependence

b4-table frame is dependent on boostrap4 and layer, so you must include them first. You can download them from Official:

[jquery](https://jquery.com/)  
[bootstrap](https://v4.bootcss.com/)  
[layer](http://layer.layui.com/)  

or you can use the following CDN

```html
<!-- bootstrap4 -->
<link href="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.bootcss.com/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>

<!-- layer.css -->
<link href="https://cdn.bootcss.com/layer/2.3/skin/layer.css" rel="stylesheet">
<script src="https://cdn.bootcss.com/layer/2.3/layer.js"></script>

<!-- jquery -->
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

## usage

### init()

b4-table offers object "Table", you can build a instantiation so that you could call init().

```html
<div id="table"></table>
```

```js
var table = new Table();

table.init("#table", initData);
```

**arguments**
* selectorStr `String` required  selector string  
* initData `JSON Object` required  data needed to build tables

### update()
```js
table.update(updateData);
```

**arguments**
* updateData `JSON Array` required  new data to rebuild table(this data only include tbody, no head)

## format

there are two examples for initData and updateData:

* initData
```json
{
    "head": [
        {
            "field": "name",
            "title": "game name"
        },
        {
            "field": "time",
            "title": "issue time"
        },
        {
            "field": "NO",
            "title": "number"
        }
    ],
    "body": [
        {
            "name": "LOL",
            "time": "2009",
            "NO": 1
        },
        {
            "name": "DNF",
            "time": "2005",
            "NO": 2
        },
        {
            "name": "PUBG",
            "time": "2017",
            "NO": 3
        },
        {
            "name": "Diablo2",
            "time": "2000",
            "NO": 4
        }
    ]
}
```

* updateData
```json
[
    {
        "name": "CS:GO",
        "time": "2012",
        "NO": 1
    },
    {
        "name": "DOTA2",
        "time": "2013",
        "NO": 2
    },
    {
        "name": "NieR:Automata",
        "time": "2017",
        "NO": 3
    },
    {
        "name": "Honkai Impact 3",
        "time": "2016",
        "NO": 4
    }
]
```

## Licence
[MIT](https://github.com/Gu-Miao/b4-table/blob/master/LICENSE)
﻿
define(function (require, exports, module) {

    var easyui = require("../PublicFunc/Easyui.js");

    exports.LoadComboboxs = function () {
        //新闻菜单
        easyui.LoadCombobox("#newsMenuId", "/Ajax/LoadMenuList", false, false, 100);
        //新闻类型
        easyui.LoadCombobox("#newsType", "/Ajax/LoadNewsType");
    };

    //加载新闻内容列表
    exports.LoadGrid = function () {
        var url, gridColumns, title;
        url = '/Contents/LoadContentGrid';
        title = '新闻内容';
        gridColumns = [
            { field: 'ck', checkbox: true },
            { field: 'NewsMenuId', title: '新闻菜单', halign: 'center', align: 'left', width: 80 },
            { field: 'NewsTitle', title: '新闻标题', halign: 'center', align: 'center', width: 240 },
            { field: 'NewsType', title: '新闻类型', halign: 'center', align: 'center', width: 80 },
            { field: 'HttpUrl', title: '新闻链接', halign: 'center', align: 'left', width: 160 },
            { field: 'AttachId', title: '附件名称', halign: 'center', align: 'left', width: 160 },
            { field: 'RleaseTime', title: '发布时间', halign: 'center', align: 'center', width: 100 },
            { field: 'NewsStatus', title: '审核状态', halign: 'center', align: 'center', width: 80 },
            { field: 'NewsHit', title: '点击率', halign: 'center', align: 'center', width: 60 }
        ];
        easyui.LoadPageDataGrid("#gridTool", url, gridColumns, title, false, undefined);
    };

    //查询
    exports.FixedSearch = function () {
        var parameters, newsMenuId, newsTitle, newsType;
        newsMenuId = $('#newsMenuId').combobox('getText');
        newsTitle = $('#newsTitle').val();
        newsType = $('#newsType').combobox('getText');
        parameters = { newsMenuId: newsMenuId, newsTitle: newsTitle, newsType: newsType };
        easyui.ReloadDataGrid("#gridTool", parameters);
    };

    //查看
    exports.FixedLook = function () {
        var row = $('#gridTool').datagrid('getChecked');
        if (row.length === 0) {
            parent.window.$.messager.alert('提示', '请先选择需要查看的数据行！', 'info');
        } else if (row.length > 1) {
            parent.window.$.messager.alert('提示', '只能选择一条数据进行查看！', 'info');
        } else {
            window.location.href = '/Contents/Info?id=' + row[0].Id;
        }
    };

    //新增
    exports.FixedAdd = function () {
        var url = "/Contents/Add";
        window.location.href = url;
    };

    //保存
    exports.SaveAdd = function () {
        var result;
        $('#addContentsForm').form('submit', {
            url: '/Contents/SaveAdd',
            success: function (data) {
                result = data.split('-');
                switch (result[0]) {
                    case "success":
                        parent.window.$.messager.alert('提示', result[1], 'info', function () {
                            window.location.href = "/Contents/Index";
                        });
                        break;
                    default:
                        $.messager.alert('提示', result[1], 'info');
                        break;
                }
            }
        });
    };

    //编辑
    exports.FixedEdit = function () {
        var row = $('#gridTool').datagrid('getChecked');
        if (row.length === 0) {
            parent.window.$.messager.alert('提示', '请先选择需要编辑的数据行！', 'info');
        } else if (row.length > 1) {
            parent.window.$.messager.alert('提示', '只能选择一条数据进行编辑！', 'info');
        } else {
            var url = '/Contents/Edit?id=' + row[0].Id;
            window.location.href = url;
        }
    };

    //更新
    exports.UpdateEdit = function () {
        var result;
        $('#editContentsForm').form('submit', {
            url: '/Contents/UpdateEdit',
            success: function (data) {
                result = data.split('-');
                switch (result[0]) {
                    case "success":
                        parent.window.$.messager.alert('提示', result[1], 'info', function () {
                            window.location.href = "/Contents/Index";
                        });
                        break;
                    default:
                        $.messager.alert('提示', result[1], 'info');
                        break;
                }
            }
        });
    };

    //删除
    exports.FixedDelete = function () {
        var row = $('#gridTool').datagrid('getChecked'), result, ids = new Array();
        if (row.length === 0) {
            parent.window.$.messager.alert('提示', '请先选择需要删除的数据行！', 'info');
        } else {
            parent.window.$.messager.confirm('提示', '确定是否删除！', function (res) {
                if (res) {
                    for (var i = 0; i < row.length; i++) {
                        ids[i] = row[i].Id;
                    }
                    $.ajax({
                        url: '/Contents/Delete',
                        type: 'post',
                        data: { ids: ids.toString() },
                        complete: function (msg) {
                            result = msg.responseText.split('-');
                            switch (result[0]) {
                                case "success":
                                    parent.window.$.messager.alert('提示', result[1], 'info');
                                    $(window.parent.$('#tabs').tabs('getSelected').find('iframe'))[0].contentWindow.$('#gridTool').datagrid('reload'); //标签页里获取iframe
                                    break;
                                default:
                                    parent.window.$.messager.alert('提示', result[1], 'info');
                            }
                        }
                    });
                }
            });
        }
    };

    //审核
    exports.FixedVerify = function () {
        var row = $('#gridTool').datagrid('getChecked'), ids = new Array();
        if (row.length === 0) {
            parent.window.$.messager.alert('提示', '请先选择需要审核的数据行！', 'info');
        } else {
            for (var i = 0; i < row.length; i++) {
                ids[i] = row[i].Id;
            }
            var url = "/Contents/Verify?ids=" + ids.toString() + "&random=" + Math.random();
            easyui.ShowParentWindow('#myWindow', '新闻内容-审核', url, 300, 150);
        }
    };

    //确认
    exports.saveSure = function () {
        var hiddenIds, isVerify, result;
        hiddenIds = $('#hiddenId').val();
        isVerify = $('#isVerify').combobox('getValue');
        if (hiddenIds == '' || hiddenIds == null) {
            parent.window.$.messager.alert('提示', '请先选择需要审核的数据行！', 'info');
            return;
        }
        $.ajax({
            url: '/Contents/SureVerify',
            data: { ids: hiddenIds, verifyId: isVerify },
            type: 'post',
            complete: function (msg) {
                result = msg.responseText.split('-');
                switch (result[0]) {
                    case "success":
                        parent.window.$('#myWindow').window('close');
                        parent.window.$.messager.alert('提示', result[1], 'info');
                        $(window.parent.$('#tabs').tabs('getSelected').find('iframe'))[0].contentWindow.$('#gridTool').datagrid('reload'); //标签页里获取iframe
                        break;
                    default:
                        parent.window.$.messager.alert('提示', result[1], 'info');
                }
            }
        });
    };

});
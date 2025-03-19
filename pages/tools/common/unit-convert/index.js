// pages/tools/common/unit-convert/index.js
const { convertUnit } = require('../../../../utils/unit-convert');

Page({
    data: {
        inputValue: '',
        fromUnit: '',
        toUnit: '',
        result: null
    },
    inputChange: function (e) {
        this.setData({
            inputValue: e.detail.value
        });
    },
    fromUnitChange: function (e) {
        this.setData({
            fromUnit: e.detail.value
        });
    },
    toUnitChange: function (e) {
        this.setData({
            toUnit: e.detail.value
        });
    },
    convert: function () {
        const { inputValue, fromUnit, toUnit } = this.data;
        const result = convertUnit(parseFloat(inputValue), fromUnit, toUnit);
        this.setData({
            result
        });
    }
})    
// tools-config.js
module.exports = {
  pcb: [
    {
      id: "via-current",
      name: "PCB过孔电流计算",
      icon: "/assets/images/pcb/via.png",
      inputs: [
        { label: "孔径 (mm)", key: "holeSize", type: "number" },
        { label: "铜厚 (oz)", key: "copperWeight", type: "picker", options: ["1 oz", "2 oz"] }
      ]
    },
    {
      id: "trace-current",
      name: "PCB电源线电流计算",
      icon: "/assets/images/pcb/trace.png",
      inputs: [
        { label: "线宽 (mm)", key: "traceWidth", type: "number" },
        { label: "铜厚 (oz)", key: "copperWeight", type: "picker", options: ["1 oz", "2 oz"] },
        { label: "允许温升 (°C)", key: "tempRise", type: "number" }
      ]
    },
    {
      id: "impedance",
      name: "PCB走线阻抗计算",
      icon: "/assets/images/pcb/impedance.png",
      inputs: [
        { label: "线宽 (mm)", key: "traceWidth", type: "number" },
        { label: "介质厚度 (mm)", key: "dielectricThickness", type: "number" },
        { label: "介电常数", key: "dielectricConstant", type: "number" }
      ]
    }
  ],
  common: [
    {
      id: "resistor-divider",
      name: "电阻分压/电流计算",
      icon: "/assets/images/resistor.png",
      inputs: [
        { label: "输入电压 (V)", key: "voltage", type: "number" },
        { label: "电阻1 (Ω)", key: "resistor1", type: "number" },
        { label: "电阻2 (Ω)", key: "resistor2", type: "number" }
      ]
    },
    {
      id: "unit-convert",
      name: "工程单位换算器",
      icon: "/assets/images/unit.png",
      inputs: [
        { label: "输入值", key: "value", type: "number" },
        { label: "源单位", key: "sourceUnit", type: "picker", options: ["mm", "mil", "Ω", "kΩ"] },
        { label: "目标单位", key: "targetUnit", type: "picker", options: ["mm", "mil", "Ω", "kΩ"] }
      ]
    },
    {
      id: "protocol-reference",
      name: "协议速查表",
      icon: "/assets/images/protocol.png",
      inputs: [
        { label: "协议类型", key: "protocol", type: "picker", options: ["UART", "I2C", "SPI"] }
      ]
    }
  ]
};
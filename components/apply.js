module.exports = function (Blockly) {
  Blockly.Blocks['apply'] = {
    init: function() {
      this.appendValueInput("ARGUMENTS")
          .setCheck("Array")
          .appendField("apply")
          .appendField(new Blockly.FieldTextInput("object"), "OBJECT");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['apply'] = function(block) {
    var text_object = block.getFieldValue('OBJECT');
    var value_arguments = Blockly.JavaScript.valueToCode(block, 'ARGUMENTS', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `
      ${text_object}.apply(null, ${value_arguments})
    `;
    return code;
  }
}

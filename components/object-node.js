module.exports = function (Blockly) {
  Blockly.Blocks['object_node'] = {
    init: function() {
      this.appendValueInput("VALUE")
          .setCheck(null)
          .appendField("object")
          .appendField(new Blockly.FieldTextInput("key"), "KEY");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }
  Blockly.JavaScript['object_node'] = function(block) {
    var text_key = block.getFieldValue('KEY');
    var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `'${text_key}': ${value_value} ,`;
    return code;
  }
}

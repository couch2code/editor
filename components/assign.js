module.exports = function (Blockly) {
  Blockly.Blocks['assign'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck(null)
          .appendField("assign")
          .appendField(new Blockly.FieldTextInput("object"), "NAME")
          .appendField("to");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['assign'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `${text_name} = ${value_name} \n`;
    return code;
  }
}

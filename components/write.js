module.exports = function (Blockly) {
  Blockly.Blocks['write'] = {
    init: function() {
      this.appendValueInput("NAME")
          .setCheck("String")
          .appendField("write")
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(80);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['write'] = function(block) {
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = `${value_name}//`;
    return code;
  }
}

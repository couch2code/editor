module.exports = function (Blockly) {
  Blockly.Blocks['call'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldTextInput("method"), "NAME");
      this.setOutput(true, null);
      this.setColour(270);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }
  Blockly.JavaScript['call'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var code = `${text_name}`;
    return [code, Blockly.JavaScript.ORDER_NONE];
  }
}

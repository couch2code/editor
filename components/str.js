module.exports = function (Blockly) {
  Blockly.Blocks['str'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("str")
          .appendField(new Blockly.FieldTextInput("text"), "NAME");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(60);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }
  Blockly.JavaScript['str'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `'${text_name}'//`;
    return code;
  }
}

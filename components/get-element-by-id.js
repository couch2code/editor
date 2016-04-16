module.exports = function (Blockly) {
  Blockly.Blocks['getelementbyid'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("getElementById")
          .appendField(new Blockly.FieldTextInput("id"), "NAME");
      this.setOutput(true, null);
      this.setColour(270);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['getelementbyid'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      document.getElementById('${text_name}')
    `;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  }

}

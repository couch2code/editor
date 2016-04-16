module.exports = function (Blockly) {
  Blockly.Blocks['watch'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("watch")
          .appendField(new Blockly.FieldTextInput("id"), "NAME")
          .appendField(new Blockly.FieldTextInput("event"), "EVENT");
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['watch'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var text_event = block.getFieldValue('EVENT')
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      document.getElementById('${text_name}')
        .addEventListener('${text_event}', function() {
          ${statements_name}  
        })
    `;
    return code;
  }
}

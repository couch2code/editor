var R = require('npm:ramda')

module.exports = function (Blockly) {
  Blockly.Blocks['h'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("h")
          .appendField(new Blockly.FieldTextInput("div"), "EL");
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(40);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['h'] = function(block) {
    var text_el = block.getFieldValue('EL');
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');

    var code = `
      h('${text_el}', [${R.dropLast(1,statements_name.split('//')).join(',')}]) //
    `;
    return code;
  };
}

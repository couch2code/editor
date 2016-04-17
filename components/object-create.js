var R = require('npm:ramda')

module.exports = function (Blockly) {
  Blockly.Blocks['object_create'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("object");
      this.appendStatementInput("NAME")
          .setCheck("key_value");
      this.setOutput(true, null);
      this.setColour(160);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['object_create'] = function(block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = `{ ${ R.dropLast(1, statements_name.split(',')).join(',') } }`
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  }
}

var R = require('npm:ramda')
var h = require('npm:hyperscript')

module.exports = function (Blockly) {
  Blockly.Blocks['render'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("render");
      this.appendStatementInput("NAME")
          .setCheck(null);
      this.setNextStatement(true, null);
      this.setColour(20);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }
  Blockly.JavaScript['render'] = function(block) {
    var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME')
    var code = `
      var target = document.getElementById('output')
      target.appendChild(
        h('div', [${R.dropLast(1,statements_name.split('//')).join(',')}])
      )
    `;
    return code;
  }
}

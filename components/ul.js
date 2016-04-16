module.exports = function (Blockly) {
  Blockly.Blocks['ul'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("ul");
      this.appendStatementInput("LI")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['ul'] = function(block) {
    var statements_li = Blockly.JavaScript.statementToCode(block, 'LI');
    console.log(statements_li)
    code = `
      var old_target = target
      target = document.createElement('ul')
      ${statements_li}
      old_target.appendChild(target)
      target = old_target
    `

    return code;
  }
}

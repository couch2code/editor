module.exports = function (Blockly) {
  Blockly.Blocks['img'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("img")
          .appendField(new Blockly.FieldTextInput("http://bit.ly/1LPdJBs"), "SRC");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(65);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['img'] = function(block) {
    var src = block.getFieldValue('SRC');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      var el = document.createElement('img')
      el.src = '${src}'
      target.appendChild(el)
    `
    return code;
  }
}

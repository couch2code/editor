module.exports = function (Blockly, element) {
  Blockly.Blocks[element] = {
    init: function() {
      this.appendDummyInput()
          .appendField(element)
          .appendField(new Blockly.FieldTextInput("enter text"), "TEXT");
      this.setColour(260);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  }

  Blockly.JavaScript[element] = function(block) {
    var text = block.getFieldValue('TEXT');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      var el = document.createElement('${element}')
      el.innerText = '${text}'
      target.appendChild(el)
    `
    return code;
  }

}

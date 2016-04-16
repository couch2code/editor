module.exports = function (Blockly) {
  Blockly.Blocks['css_add_class'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("addClass - add")
          .appendField(new Blockly.FieldTextInput("classname"), "NAME")
          .appendField("to")
          .appendField(new Blockly.FieldTextInput("id"), "ID");
      this.setColour(65);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }
  Blockly.JavaScript['css_add_class'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var text_id = block.getFieldValue('ID');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      var el = document.getElementById('${text_id}')
      if (!el.classList.contains('${text_name}')) {
        el.classList.add('${text_name}')
      }
    `;
    return code;
  }
}

module.exports = function (Blockly) {
  Blockly.Blocks['css_remove_class'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("removeClass - remove")
          .appendField(new Blockly.FieldTextInput("classname"), "NAME")
          .appendField("from")
          .appendField(new Blockly.FieldTextInput("id"), "ID");
      this.setColour(65);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }
  Blockly.JavaScript['css_remove_class'] = function(block) {
    var text_name = block.getFieldValue('NAME');
    var text_id = block.getFieldValue('ID');
    // TODO: Assemble JavaScript into code variable.
    var code = `
      var el = document.getElementById('${text_id}')
      if (el.classList.contains('${text_name}')) {
        el.classList.remove('${text_name}')
      }
    `;
    return code;
  }
}

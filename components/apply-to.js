module.exports = function (Blockly) {
  Blockly.Blocks['applyto'] = {
    init: function() {
      this.appendValueInput("ARGUMENTS")
          .setCheck("Array")
          .appendField("applyTo")
          .appendField(new Blockly.FieldTextInput("object"), "OBJECT");
      this.setOutput(true, null);
      this.setColour(270);
      this.setTooltip('');
      this.setHelpUrl('http://www.example.com/');
    }
  }

  Blockly.JavaScript['applyto'] = function(block) {
    var text_object = block.getFieldValue('OBJECT');
    var value_arguments = Blockly.JavaScript.valueToCode(block, 'ARGUMENTS', Blockly.JavaScript.ORDER_ATOMIC);
    var code = `
      ${text_object}.apply(null, ${value_arguments})
    `
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
  }
}

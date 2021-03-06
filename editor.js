var domify = require('npm:domify')
var R = require('npm:ramda')

var h = require('npm:hyperscript')
var hBlock = require('./components/h')
var renderBlock = require('./components/render')
var strBlock = require('./components/str')
var watchBlock = require('./components/watch')
var writeBlock = require('./components/write')
var applyBlock = require('./components/apply')
var applyToBlock = require('./components/apply-to')
var getElementByIdBlock = require('./components/get-element-by-id')
var callBlock = require('./components/call')
var assignBlock = require('./components/assign')
var addClassBlock = require('./components/add-class')
var removeClassBlock = require('./components/remove-class')
var objectNodeBlock = require('./components/object-node')
var objectCreateBlock = require('./components/object-create')

//var PouchDB = require('npm:pouchdb')
var db = PouchDB('https://twilson63.cloudant.com/code10k')

var body = domify(`
<div class="container-fluid">
  <div class="row">
    <h1 class="text-md-center">Code10k Editor</h1>
  </div>
  <div class="row">
    <div class="col-md-8">
      <div id="blocklyDiv" style="height: 600px; width: '100%';"></div>
    </div>
    <div class="col-md-4">
      <div class="pull-md-right">
        <button id="generate" class="btn btn-primary">Run</button>
        <button id="save" class="btn btn-success">Save</button>
        <button id="new" class="btn btn-warning">New</button>
      </div>
      <h4 class="m-t-3">Output</h3>
      <hr />
      <div id="output"></div>
      <hr />
      <h4 class="m-t-3">Code</h3>
      <div class="">
        <pre id="code">

        </pre>
      </div>
    </div>
  </div>
</div>
<xml id="toolbox" style="display: none">
    <category name="Logic" id="catLogic" colour="210">
      <block type="controls_if"></block>
      <block type="logic_compare"></block>
      <block type="logic_operation"></block>
      <block type="logic_negate"></block>
      <block type="logic_boolean"></block>
      <block type="logic_null"></block>
      <block type="logic_ternary"></block>
    </category>
    <category name="Loops" id="catLoops" colour="120">
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="controls_whileUntil"></block>
      <block type="controls_for">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
        <value name="BY">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="controls_forEach"></block>
      <block type="controls_flow_statements"></block>
    </category>
    <category name="Math" id="catMath" colour="230">
      <block type="math_number"></block>
      <block type="math_arithmetic">
        <value name="A">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="B">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="math_single">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">9</field>
          </shadow>
        </value>
      </block>
      <block type="math_trig">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">45</field>
          </shadow>
        </value>
      </block>
      <block type="math_constant"></block>
      <block type="math_number_property">
        <value name="NUMBER_TO_CHECK">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="math_change">
        <value name="DELTA">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
      </block>
      <block type="math_round">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">3.1</field>
          </shadow>
        </value>
      </block>
      <block type="math_on_list"></block>
      <block type="math_modulo">
        <value name="DIVIDEND">
          <shadow type="math_number">
            <field name="NUM">64</field>
          </shadow>
        </value>
        <value name="DIVISOR">
          <shadow type="math_number">
            <field name="NUM">10</field>
          </shadow>
        </value>
      </block>
      <block type="math_constrain">
        <value name="VALUE">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="LOW">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="HIGH">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="math_random_int">
        <value name="FROM">
          <shadow type="math_number">
            <field name="NUM">1</field>
          </shadow>
        </value>
        <value name="TO">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
      </block>
      <block type="math_random_float"></block>
    </category>
    <category name="Text" id="catText" colour="160">
      <block type="text"></block>
      <block type="text_join"></block>
      <block type="text_append">
        <value name="TEXT">
          <shadow type="text"></shadow>
        </value>
      </block>
      <block type="text_length">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_isEmpty">
        <value name="VALUE">
          <shadow type="text">
            <field name="TEXT"></field>
          </shadow>
        </value>
      </block>
      <block type="text_indexOf">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
        <value name="FIND">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_charAt">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_getSubstring">
        <value name="STRING">
          <block type="variables_get">
            <field name="VAR">text</field>
          </block>
        </value>
      </block>
      <block type="text_changeCase">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_trim">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_print">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
      <block type="text_prompt_ext">
        <value name="TEXT">
          <shadow type="text">
            <field name="TEXT">abc</field>
          </shadow>
        </value>
      </block>
    </category>
    <category name="Lists" id="catLists" colour="260">
      <block type="lists_create_with">
        <mutation items="0"></mutation>
      </block>
      <block type="lists_create_with"></block>
      <block type="lists_repeat">
        <value name="NUM">
          <shadow type="math_number">
            <field name="NUM">5</field>
          </shadow>
        </value>
      </block>
      <block type="lists_length"></block>
      <block type="lists_isEmpty"></block>
      <block type="lists_indexOf">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">list</field>
          </block>
        </value>
      </block>
      <block type="lists_getIndex">
        <value name="VALUE">
          <block type="variables_get">
            <field name="VAR">list</field>
          </block>
        </value>
      </block>
      <block type="lists_setIndex">
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR">list</field>
          </block>
        </value>
      </block>
      <block type="lists_getSublist">
        <value name="LIST">
          <block type="variables_get">
            <field name="VAR">list</field>
          </block>
        </value>
      </block>
      <block type="lists_split">
        <value name="DELIM">
          <shadow type="text">
            <field name="TEXT">,</field>
          </shadow>
        </value>
      </block>
    </category>
    <category name="Objects" id="catObject" colour="40">
      <block type="object_create"></block>
      <block type="object_node"></block>
    </category>
    <category name="Colors" id="catColour" colour="20">
      <block type="colour_picker"></block>
      <block type="colour_random"></block>
      <block type="colour_rgb">
        <value name="RED">
          <shadow type="math_number">
            <field name="NUM">100</field>
          </shadow>
        </value>
        <value name="GREEN">
          <shadow type="math_number">
            <field name="NUM">50</field>
          </shadow>
        </value>
        <value name="BLUE">
          <shadow type="math_number">
            <field name="NUM">0</field>
          </shadow>
        </value>
      </block>
      <block type="colour_blend">
        <value name="COLOUR1">
          <shadow type="colour_picker">
            <field name="COLOUR">#ff0000</field>
          </shadow>
        </value>
        <value name="COLOUR2">
          <shadow type="colour_picker">
            <field name="COLOUR">#3333ff</field>
          </shadow>
        </value>
        <value name="RATIO">
          <shadow type="math_number">
            <field name="NUM">0.5</field>
          </shadow>
        </value>
      </block>
    </category>
    <sep></sep>
    <category name="Variables" id="catVariables" colour="330" custom="VARIABLE"></category>
    <category name="Functions" id="catFunctions" colour="290" custom="PROCEDURE"></category>
    <sep></sep>
    <category name="Html" id="catHtml" colour="20">
      <block type="h"></block>
      <block type="render"></block>
      <block type="str"></block>
      <block type="watch"></block>
      <block type="write"></block>
      <block type="getelementbyid"></block>
    </category>
    <category name="CSS" id="catCSS" colour="180">
      <block type="css_add_class"></block>
      <block type="css_remove_class"></block>
    </category>
    <category name="JS" id="catJS" colour="320">
      <block type="apply"></block>
      <block type="applyto"></block>
      <block type="call"></block>
      <block type="assign"></block>
    </category>
  </xml>
`)

document.body.appendChild(body)

hBlock(Blockly)
renderBlock(Blockly)
strBlock(Blockly)
watchBlock(Blockly)
writeBlock(Blockly)
applyBlock(Blockly)
applyToBlock(Blockly)
getElementByIdBlock(Blockly)
callBlock(Blockly)
assignBlock(Blockly)
addClassBlock(Blockly)
removeClassBlock(Blockly)
objectCreateBlock(Blockly)
objectNodeBlock(Blockly)

var workspace = Blockly.inject('blocklyDiv', {
  media: 'https://rawgit.com/google/blockly/master/media/',
  toolbox: document.getElementById('toolbox'),
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  }
  // ,
  // zoom: {
  //   controls: true,
  //   wheel: true
  // }
})


document.getElementById('generate').addEventListener('click', function(e) {

    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var el = document.getElementById('code')
    el.innerText = code //R.tail(code.split('// start\n'))

    var target = document.getElementById('output')
    target.innerHTML = ''

    try {
      eval(code);
    } catch (e) {
      alert(e);
    }
})

document.getElementById('save')
  .addEventListener('click', function (e) {
    Blockly.JavaScript.addReservedWords('code');
    var code = Blockly.JavaScript.workspaceToCode(workspace)
    var xmlDom = Blockly.Xml.workspaceToDom(workspace)
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom)
    db.post({
      js: code,
      xml: xmlText
    })
      .then(res => window.location.hash = res.id)
  })

document.getElementById('new')
  .addEventListener('click', function (e) {
    window.location.href = '/'
  })

if (window.location.hash) {
  var id = R.tail(window.location.hash.split('#'))[0]
  db.get(id)
    .then(doc => {
      var xmlDom = Blockly.Xml.textToDom(doc.xml)
      Blockly.Xml.domToWorkspace(xmlDom, workspace)
    })
    .catch(err => console.log(err))
}

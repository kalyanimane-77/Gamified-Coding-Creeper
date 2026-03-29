(function () {
  if (!window.LC || !LC.requireAuth()) return;

  var langSelect = document.getElementById('lang-select');
  var themeSelect = document.getElementById('theme-select');
  var editor = document.getElementById('playground-editor');
  var output = document.getElementById('playground-output');
  var terminal = document.querySelector('.terminal-output');
  var runBtn = document.getElementById('playground-run-btn');
  var langBadge = document.getElementById('current-lang-badge');
  var ideContainer = document.getElementById('ide-container-bg');
  var fileExt = document.getElementById('file-ext');
  var lineNumbers = document.getElementById('line-numbers');
  
  // Extension mapping
  var exts = { python: 'py', java: 'java', cpp: 'cpp', javascript: 'js' };

  var defaultCodes = {
    python: '# Write your Python code here\nprint("Hello, Sandbox!")',
    java: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Sandbox!");\n    }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, Sandbox!" << std::endl;\n    return 0;\n}',
    javascript: '// Write your JavaScript here\nconsole.log("Hello, Sandbox!");'
  };

  // Sync Line Numbers
  function updateLineNumbers() {
    var lines = editor.value.split('\n').length;
    var numbersStr = Array.from({length: lines}, (_, i) => i + 1).join('\n');
    if (lineNumbers.textContent !== numbersStr) {
        lineNumbers.textContent = numbersStr;
    }
  }
  editor.addEventListener('input', updateLineNumbers);
  editor.addEventListener('scroll', function() {
    lineNumbers.scrollTop = editor.scrollTop;
  });

  function updateEditor() {
    var lang = langSelect.value;
    langBadge.textContent = langSelect.options[langSelect.selectedIndex].text;
    if (fileExt) fileExt.textContent = exts[lang];
    
    var currentTxt = editor.value.trim();
    var isDefault = false;
    for (var k in defaultCodes) {
        if (currentTxt === defaultCodes[k].trim() || currentTxt === "") {
            isDefault = true;
            break;
        }
    }
    
    if (isDefault) {
        editor.value = defaultCodes[lang];
        updateLineNumbers();
    }
  }

  function toggleTheme() {
    var theme = themeSelect.value;
    var isLight = theme === 'light';
    
    // Theme colors
    var bgCard = isLight ? '#ffffff' : '#0d1117';
    var text = isLight ? '#333333' : '#c9d1d9';
    var bgElevated = isLight ? '#f3f4f6' : '#161b22';
    var border = isLight ? '#e5e7eb' : 'rgba(255,255,255,0.1)';
    var selectBg = isLight ? '#ffffff' : 'rgba(0,0,0,0.3)';
    
    // Apply
    document.documentElement.style.setProperty('--bg-card', bgCard);
    document.documentElement.style.setProperty('--bg-elevated', bgElevated);
    document.documentElement.style.setProperty('--border', border);
    
    ideContainer.style.background = bgCard;
    editor.style.color = text;
    langSelect.style.background = selectBg;
    langSelect.style.color = text;
    themeSelect.style.background = selectBg;
    themeSelect.style.color = text;
  }

  langSelect.addEventListener('change', updateEditor);
  themeSelect.addEventListener('change', toggleTheme);
  
  // Action Buttons
  document.getElementById('reset-btn').addEventListener('click', function() {
      editor.value = defaultCodes[langSelect.value];
      updateLineNumbers();
  });
  
  document.getElementById('format-btn').addEventListener('click', function() {
      // Fake format (just trims for now)
      editor.value = editor.value.trim();
      updateLineNumbers();
  });

  document.getElementById('clear-console-btn').addEventListener('click', function() {
      output.textContent = 'Ready to run code...';
      output.className = 'ide-output';
      terminal.innerHTML = 'CodecCreeper Bash (v1.0.0)<br/>$ <span class="cursor-blink">_</span>';
  });

  // Bottom Tabs
  var panelTabs = document.querySelectorAll('.panel-tab');
  panelTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
          panelTabs.forEach(t => t.classList.remove('active'));
          document.querySelectorAll('.panel-content').forEach(c => c.classList.remove('active'));
          tab.classList.add('active');
          document.getElementById(tab.getAttribute('data-target') + '-content').classList.add('active');
      });
  });

  // Advanced Simulation Engine
  function simulatedEval(code, lang) {
    const scope = {};
    const out = [];
    const lines = code.split('\n');

    lines.forEach(line => {
      let l = line.trim();
      if (!l || l.startsWith('#') || l.startsWith('//') || l.startsWith('/*')) return;

      // Detect Assignments: a=1, let b=2, etc.
      // (Simplified: handles name=expr)
      const assignMatch = l.match(/^(?:let|var|const|int|float|double|String|auto)?\s*([a-zA-Z_]\w*)\s*=\s*(.*)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        let expression = assignMatch[2].replace(/;$/, '').trim();
        // Basic translation for things like 'True' to 'true' if Python
        if (lang === 'python') {
           expression = expression.replace(/\bTrue\b/g, 'true').replace(/\bFalse\b/g, 'false').replace(/\bNone\b/g, 'null');
        }
        try {
          const keys = Object.keys(scope);
          const vals = Object.values(scope);
          const val = new Function(...keys, `return ${expression}`)(...vals);
          scope[varName] = val;
        } catch (e) { /* silent skip */ }
        return;
      }

      // Detect Output
      let printExpr = null;
      if (lang === 'python') {
        const m = l.match(/^print\s*\((.*)\)$/);
        if (m) printExpr = m[1];
      } else if (lang === 'javascript') {
        const m = l.match(/^console\.log\s*\((.*)\);?$/);
        if (m) printExpr = m[1];
      } else if (lang === 'java') {
        const m = l.match(/^System\.out\.println\s*\((.*)\);?$/);
        if (m) printExpr = m[1];
      } else if (lang === 'cpp') {
        const m = l.match(/^(?:std::)?cout\s*<<\s*(.*);?$/);
        if (m) {
          printExpr = m[1].replace(/<<\s*(?:std::)?endl\s*$/, '').trim();
        }
      }

      if (printExpr !== null) {
        try {
          const keys = Object.keys(scope);
          const vals = Object.values(scope);
          const val = new Function(...keys, `return ${printExpr}`)(...vals);
          out.push((lang === 'python' ? '> ' : '') + val);
        } catch (e) {
          out.push((lang === 'python' ? '> ' : '') + "[Error: " + e.message + "]");
        }
      }
    });
    return out;
  }

  // Run Logic
  runBtn.addEventListener('click', function() {
    var code = editor.value.trim();
    var lang = langSelect.value;
    
    runBtn.innerHTML = '<span class="icon">🔃</span> Running...';
    runBtn.disabled = true;
    output.className = 'ide-output';
    output.textContent = 'Compiling...';
    terminal.innerHTML += '<br/>$ ./build.sh && ./run.exe<br/>Compiling...';
    
    // Switch to console tab automatically
    document.querySelector('.panel-tab[data-target="console"]').click();
    
    setTimeout(function() {
      runBtn.innerHTML = '<span class="icon">▶</span> Run Code';
      runBtn.disabled = false;
      
      if(code.length === 0) {
         output.className = 'ide-output error';
         output.textContent = 'Error: Please write some code to execute.';
         terminal.innerHTML += '<br/><span style="color:var(--neon-pink)">Build failed: No input files</span><br/>$ <span class="cursor-blink">_</span>';
         return;
      }

      const outLines = simulatedEval(editor.value, lang);

      // Fallback if no prints found but code exists
      if (outLines.length === 0) {
          outLines.push("Sandbox Execution Success!");
          outLines.push("(No explicit output detected in your code)");
      }
      
      output.className = 'ide-output success';
      output.textContent = outLines.join('\n');
      terminal.innerHTML += '<br/>Execution completed in 0.42s.<br/>$ <span class="cursor-blink">_</span>';
      
      LC.addXP(5);
    }, 800);
  });

  document.getElementById('logout-btn').addEventListener('click', function () { LC.logout(); });

  // Init
  updateEditor();
  toggleTheme();

})();

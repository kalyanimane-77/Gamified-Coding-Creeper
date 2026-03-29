/* Topic data: addTopic(langId, { id, title, level, tutorial, quiz, flashcards, challenges }) */

(function () {
  var T = function (o) { return o; };

  // ----- Python -----
  addTopic('python', T({
    id: 'py-variables',
    title: 'Variables',
    level: 'beginner',
    tutorial: {
      explanation: 'A variable is a name that holds a value. You assign with = and use the name to read or change the value later.',
      example: 'name = "Alex"\nage = 10\nprint(name)  # Alex',
      kidsExplanation: 'Think of a variable like a labeled box. You put something in the box and give it a name so you can find it later!'
    },
    quiz: [
      { 
        type: 'output', 
        question: 'What does print(x) show if we run: x = 5 then print(x)?', 
        options: ['5', 'x', 'None', 'Error'], 
        correct: 0,
        hint: 'We stored 5 in x. So print(x) will show what is inside x.',
        example: 'x = 10\nprint(x)  # This prints 10'
      },
      { 
        type: 'concept', 
        question: 'Which symbol is used to assign a value to a variable in Python?', 
        options: ['==', '=', ':=', ':'], 
        correct: 1,
        hint: 'It is a single equal sign. "x = 5" means "x gets 5".'
      },
      { 
        type: 'completion', 
        question: 'Complete: ___ = 42  (store 42 in a variable called "answer")', 
        options: ['answer', 'var answer', 'let answer', 'int answer'], 
        correct: 0,
        hint: 'In Python, you just write the name, then =, then the value. No "var" or "let" needed!'
      },
      { 
        type: 'output', 
        question: 'After a = 3 and b = a + 1, what is b?', 
        options: ['3', '4', 'a+1', 'undefined'], 
        correct: 1,
        hint: 'a is 3. So a + 1 is 3 + 1. What is 3 + 1?'
      },
      { 
        type: 'concept', 
        question: 'Can you change the value of a variable after creating it?', 
        options: ['No, never', 'Yes, by assigning again', 'Only if it is a number', 'Only in functions'], 
        correct: 1,
        hint: 'Variable means "able to vary" or change. You can give it a new value anytime.'
      }
    ],
    flashcards: [
      { term: 'Variable', definition: 'A named container that stores a value.', example: 'x = 10' },
      { term: 'Assignment', definition: 'Giving a value to a variable using =.', example: 'name = "Sam"' },
      { term: 'Identifier', definition: 'The name you choose for a variable (e.g. count, total).', example: 'score = 0' },
      { term: 'Reassignment', definition: 'Changing the value of an existing variable.', example: 'x = 1\nx = 2' },
      { term: 'Expression', definition: 'Code that produces a value (e.g. 2 + 3).', example: 'result = 2 + 3' }
    ],
    challenges: [
      { problem: 'Create a variable called score and set it to 0. Then create another variable level and set it to 1. Print both.', hint: 'Use = to assign. Use print(score, level).', expectedOutput: '0 1', difficulty: 'beginner', bonusTip: 'Variables are just labels for boxes. You can put anything in them and change the label later!' }
    ]
  }));

  addTopic('python', T({
    id: 'py-strings',
    title: 'Strings',
    level: 'beginner',
    tutorial: {
      explanation: 'A string is text inside quotes. You can use single or double quotes. Strings can be concatenated with +.',
      example: 'greeting = "Hello"\nname = \'World\'\nprint(greeting + ", " + name)  # Hello, World',
      kidsExplanation: 'A string is a piece of text. We wrap it in quotes so the computer knows it\'s words, not code!'
    },
    quiz: [
      { type: 'output', question: 'What is the output of print("Hi" + "!")?', options: ['Hi!', 'Hi + !', 'Hi !', 'Error'], correct: 0 },
      { type: 'concept', question: 'Which of these is a valid string in Python?', options: ['"hello"', '[hello]', '(hello)', 'hello'], correct: 0 },
      { type: 'output', question: 'What does len("abc") return?', options: ['abc', '3', '2', '0'], correct: 1 },
      { type: 'completion', question: 'To get the first character of s = "Python", you write:', options: ['s(0)', 's[0]', 's.0', 's.first'], correct: 1 },
      { type: 'output', question: 'What is "2" + "2" in Python?', options: ['4', '22', '"2"+"2"', 'Error'], correct: 1 }
    ],
    flashcards: [
      { term: 'String', definition: 'A sequence of characters enclosed in quotes.', example: '"hello"' },
      { term: 'Concatenation', definition: 'Joining strings together with +.', example: '"Hi" + "!"' },
      { term: 'len()', definition: 'Built-in function that returns the number of characters in a string.', example: 'len("abc")  # 3' },
      { term: 'Indexing', definition: 'Accessing one character by position; first character is index 0.', example: '"cat"[0]  # "c"' },
      { term: 'Slice', definition: 'Getting a part of a string with [start:end].', example: '"hello"[1:4]  # "ell"' }
    ],
    challenges: [
      { problem: 'Store your first name in a variable and your last name in another. Print the full name with a space between them.', hint: 'Use + to join strings. Add " " in the middle.', expectedOutput: 'First Last (example)', difficulty: 'beginner', bonusTip: 'You can also use Python f-strings! Try print(f"{first} {last}")' }
    ]
  }));

  addTopic('python', T({
    id: 'py-lists',
    title: 'Lists',
    level: 'beginner',
    tutorial: {
      explanation: 'A list holds multiple values in order. You create it with square brackets and separate items with commas. You can access by index starting at 0.',
      example: 'fruits = ["apple", "banana", "cherry"]\nprint(fruits[1])   # banana\nprint(len(fruits))  # 3',
      kidsExplanation: 'A list is like a row of boxes. Each box has a number (0, 1, 2...) and you can put something in each box.'
    },
    quiz: [
      { type: 'output', question: 'What is [1, 2, 3][1]?', options: ['1', '2', '3', 'Error'], correct: 1 },
      { type: 'concept', question: 'How do you create an empty list in Python?', options: ['list()', '[]', 'empty()', 'new list'], correct: 1 },
      { type: 'output', question: 'After nums = [10, 20]; nums.append(30), what is len(nums)?', options: ['2', '3', '20', '30'], correct: 1 },
      { type: 'completion', question: 'To get the last item of list L (without knowing its length):', options: ['L.last', 'L[-1]', 'L(end)', 'last(L)'], correct: 1 },
      { type: 'output', question: 'What is [1, 2] + [3]?', options: ['[1,2,3]', '[4,5]', 'Error', '[1,2][3]'], correct: 0 }
    ],
    flashcards: [
      { term: 'List', definition: 'Ordered collection of values in square brackets.', example: '[1, 2, 3]' },
      { term: 'append()', definition: 'List method that adds one item to the end.', example: 'L.append(4)' },
      { term: 'Index', definition: 'Position of an item; first is 0, last can be -1.', example: 'L[-1]' },
      { term: 'len() on list', definition: 'Returns the number of items in the list.', example: 'len([1,2,3])  # 3' },
      { term: 'List concatenation', definition: 'Using + to combine two lists into one.', example: '[1,2] + [3]  # [1,2,3]' }
    ],
    challenges: [
      { problem: 'Create a list with three numbers: 5, 10, 15. Append 20. Print the list and its length.', hint: 'Use .append(20). Use print(list) and print(len(list)).', expectedOutput: '[5, 10, 15, 20]\\n4', difficulty: 'beginner', bonusTip: 'Lists can hold different types of things at the same time, like numbers AND strings!' }
    ]
  }));

  addTopic('python', T({
    id: 'py-if-else',
    title: 'If and Else',
    level: 'beginner',
    tutorial: {
      explanation: 'Use if to run code only when a condition is true. Optionally use elif for more conditions and else for when none match. Conditions use ==, !=, <, >, <=, >=.',
      example: 'age = 14\nif age >= 18:\n    print("Adult")\nelif age >= 13:\n    print("Teen")\nelse:\n    print("Child")  # Teen',
      kidsExplanation: 'If/else is like choosing: "If it is raining, take an umbrella; else, leave it home." The computer checks and picks one path.'
    },
    quiz: [
      { type: 'output', question: 'What prints? x=5; if x>3: print("yes") else: print("no")', options: ['yes', 'no', 'yes no', 'Error'], correct: 0 },
      { type: 'concept', question: 'Which checks for equality in Python?', options: ['=', '==', 'eq', 'equals'], correct: 1 },
      { type: 'completion', question: 'To test "a is not equal to b" you write:', options: ['a != b', 'a not b', 'a <> b', 'not a == b'], correct: 0 },
      { type: 'output', question: 'After n=0; if n: print("A") else: print("B")', options: ['A', 'B', 'A B', 'Nothing'], correct: 1 },
      { type: 'concept', question: 'What keyword is used for "otherwise" when no condition matches?', options: ['otherwise', 'elif', 'else', 'default'], correct: 2 }
    ],
    flashcards: [
      { term: 'if', definition: 'Runs a block only when the condition is true.', example: 'if x > 0: print("positive")' },
      { term: 'else', definition: 'Runs when the if (and any elif) condition is false.', example: 'else: print("other")' },
      { term: 'elif', definition: 'Short for "else if"; checks another condition.', example: 'elif x == 0: print("zero")' },
      { term: 'Condition', definition: 'Expression that is either True or False.', example: 'age >= 18' },
      { term: 'Comparison', definition: 'Operators like ==, !=, <, > that produce True/False.', example: 'a != b' }
    ],
    challenges: [
      { problem: 'Set a variable temp = 25. If temp is above 30 print "Hot", else if above 20 print "Warm", else print "Cool".', hint: 'Use if temp > 30, elif temp > 20, else.', expectedOutput: 'Warm', difficulty: 'beginner', bonusTip: 'Python uses indentation to know what goes inside an if/else block. Always use 4 spaces!' }
    ]
  }));

  addTopic('python', T({
    id: 'py-for-loops',
    title: 'For Loops',
    level: 'beginner',
    tutorial: {
      explanation: 'A for loop repeats code for each item in a sequence. Use "for item in sequence:" and indent the body. You can loop over strings, lists, or use range(n) for numbers 0 to n-1.',
      example: 'for letter in "Hi":\n    print(letter)  # H then i\nfor i in range(3):\n    print(i)  # 0, 1, 2',
      kidsExplanation: 'A for loop goes through a list one by one. Like saying "for each toy in the box, pick it up."'
    },
    quiz: [
      { type: 'output', question: 'What does for x in [1,2]: print(x) output?', options: ['1 2', '1\\n2', 'x x', '12'], correct: 1 },
      { type: 'concept', question: 'What does range(3) produce?', options: ['[0,1,2]', '0,1,2 (sequence)', '[1,2,3]', '3'], correct: 1 },
      { type: 'output', question: 'How many times does "run" print? for i in range(2): print("run")', options: ['0', '1', '2', '3'], correct: 2 },
      { type: 'completion', question: 'To loop over list L and use each element: for ___ in L:', options: ['item', 'i', 'element', 'any variable'], correct: 3 },
      { type: 'output', question: 'What is the last value of i in: for i in range(5): pass', options: ['4', '5', '0', 'None'], correct: 0 }
    ],
    flashcards: [
      { term: 'for loop', definition: 'Repeats a block for each item in a sequence.', example: 'for x in [1,2,3]: print(x)' },
      { term: 'range(n)', definition: 'Sequence of integers from 0 to n-1.', example: 'range(3)  # 0,1,2' },
      { term: 'Iteration', definition: 'One pass through the loop body.', example: 'Each print(x) is one iteration' },
      { term: 'Loop variable', definition: 'The variable that takes each value (e.g. x in for x in L).', example: 'for x in items' },
      { term: 'range(start, end)', definition: 'Integers from start up to but not including end.', example: 'range(1,4)  # 1,2,3' }
    ],
    challenges: [
      { problem: 'Use a for loop to print the numbers 0, 1, 2, 3, 4 (each on its own line).', hint: 'Use for i in range(5): and print(i).', expectedOutput: '0\\n1\\n2\\n3\\n4', difficulty: 'beginner', bonusTip: 'range(start, end) goes up to but DOES NOT include the end number!' }
    ]
  }));

  addTopic('python', T({
    id: 'py-functions',
    title: 'Functions',
    level: 'beginner',
    tutorial: {
      explanation: 'A function is a reusable block of code. Define it with def name(): and indent the body. Call it with name().',
      example: 'def greet():\n    print("Hello!")\ngreet()  # Hello!',
      kidsExplanation: 'A function is like a recipe. You write the steps once, then you can "cook" that recipe anytime by calling the function.'
    },
    quiz: [
      { type: 'concept', question: 'Which keyword defines a function in Python?', options: ['function', 'def', 'func', 'define'], correct: 1 },
      { type: 'output', question: 'What happens when you define def f(): print(1) but never call f()?', options: ['1 is printed', 'Nothing', 'Error', 'f is printed'], correct: 1 },
      { type: 'completion', question: 'To call a function named say_hi you write:', options: ['call say_hi()', 'say_hi()', 'say_hi', 'run say_hi'], correct: 1 },
      { type: 'output', question: 'def f(): return 7\nprint(f()) prints:', options: ['f()', '7', 'None', 'Error'], correct: 1 },
      { type: 'concept', question: 'What does return do in a function?', options: ['Stops the program', 'Sends a value back to the caller', 'Prints a value', 'Restarts the function'], correct: 1 }
    ],
    flashcards: [
      { term: 'Function', definition: 'Named block of code that runs when called.', example: 'def hello(): print("Hi")' },
      { term: 'Definition', definition: 'Where you write the function with def.', example: 'def my_func(): ...' },
      { term: 'Call', definition: 'Running the function by writing its name and ().', example: 'my_func()' },
      { term: 'return', definition: 'Sends a value back and exits the function.', example: 'return 42' },
      { term: 'Parameter', definition: 'A variable in the function definition that receives a value.', example: 'def add(a, b): return a + b' }
    ],
    challenges: [
      { problem: 'Define a function greet that prints "Hello, learner!". Then call it twice.', hint: 'def greet(): then print(...). Call with greet().', expectedOutput: 'Hello, learner!\\nHello, learner!', difficulty: 'beginner' }
    ]
  }));

  addTopic('python', T({
    id: 'py-dictionaries',
    title: 'Dictionaries',
    level: 'intermediate',
    tutorial: {
      explanation: 'A dictionary maps keys to values. You create it with { key: value } and look up with dict[key] or dict.get(key). Keys are often strings.',
      example: 'ages = {"Alice": 25, "Bob": 30}\nprint(ages["Alice"])  # 25\nages["Bob"] = 31',
      kidsExplanation: 'A dictionary is like a real dictionary: you look up a word (key) and get its meaning (value).'
    },
    quiz: [
      { type: 'output', question: 'What is {"a":1,"b":2}["b"]?', options: ['1', '2', 'b', 'Error'], correct: 1 },
      { type: 'concept', question: 'Dictionary entries are called key-value ___.', options: ['pairs', 'items', 'entries', 'Any of these'], correct: 3 },
      { type: 'output', question: 'd = {}; d["x"] = 10; print(d.get("x"))', options: ['{}', '10', 'None', 'Error'], correct: 1 },
      { type: 'completion', question: 'To add key "k" with value 5 to dict d:', options: ['d.add("k",5)', 'd["k"] = 5', 'd.insert("k",5)', 'd.k = 5'], correct: 1 },
      { type: 'output', question: 'len({"a":1,"b":2,"c":3}) is:', options: ['6', '3', '2', '1'], correct: 1 }
    ],
    flashcards: [
      { term: 'Dictionary', definition: 'Collection of key-value pairs in {}.', example: '{"name": "Sam", "age": 10}' },
      { term: 'Key', definition: 'The lookup label; must be unique in a dict.', example: '"name" in {"name": "Sam"}' },
      { term: 'get()', definition: 'Returns value for key, or None (or default) if missing.', example: 'd.get("x", 0)' },
      { term: 'Mutable', definition: 'You can add/change/remove items in a dict.', example: 'd["new"] = 1' },
      { term: 'KeyError', definition: 'Error when accessing a key that does not exist.', example: 'd["missing"]  # KeyError' }
    ],
    challenges: [
      { problem: 'Create a dict with "name" and "score". Set name to "Player" and score to 100. Print the score.', hint: 'd = {"name": "Player", "score": 100}; print(d["score"])', expectedOutput: '100', difficulty: 'beginner' }
    ]
  }));

  addTopic('python', T({
    id: 'py-while',
    title: 'While Loops',
    level: 'beginner',
    tutorial: {
      explanation: 'A while loop repeats as long as a condition is true. Use "while condition:" and indent the body. Make sure the condition eventually becomes false to avoid an infinite loop.',
      example: 'n = 0\nwhile n < 3:\n    print(n)\n    n = n + 1  # 0, 1, 2',
      kidsExplanation: 'While is like "keep going until something changes." Like "while it is dark, keep the light on."'
    },
    quiz: [
      { type: 'output', question: 'n=0; while n<2: print(n); n+=1. How many lines printed?', options: ['0', '1', '2', 'Infinite'], correct: 2 },
      { type: 'concept', question: 'When does a while loop stop?', options: ['After 10 times', 'When the condition is false', 'When you call stop()', 'Never'], correct: 1 },
      { type: 'completion', question: 'To avoid infinite loop you must ___ the condition inside the loop.', options: ['print', 'change', 'check', 'ignore'], correct: 1 },
      { type: 'output', question: 'x=5; while x>0: x-=1. What is x after the loop?', options: ['5', '1', '0', '-1'], correct: 2 },
      { type: 'concept', question: 'What happens if while True: runs with no break?', options: ['Runs once', 'Runs 100 times', 'Runs forever', 'Error'], correct: 2 }
    ],
    flashcards: [
      { term: 'while loop', definition: 'Repeats while a condition is true.', example: 'while x < 5: x += 1' },
      { term: 'Condition (while)', definition: 'Checked before each iteration; loop stops when false.', example: 'while count > 0' },
      { term: 'Infinite loop', definition: 'Loop that never stops because condition never becomes false.', example: 'while True: ...' },
      { term: 'break', definition: 'Exits the loop immediately.', example: 'while True: if done: break' },
      { term: 'Loop body', definition: 'The indented block that runs each time.', example: 'while x<3: print(x); x+=1' }
    ],
    challenges: [
      { problem: 'Use a while loop to print 1, then 2, then 3. Start with n=1 and stop when n>3.', hint: 'while n <= 3: print(n); n += 1', expectedOutput: '1\\n2\\n3', difficulty: 'beginner' }
    ]
  }));

  addTopic('python', T({
    id: 'py-parameters',
    title: 'Parameters and Arguments',
    level: 'intermediate',
    tutorial: {
      explanation: 'Parameters are names in the function definition; arguments are the values you pass when calling. The order matches: first argument goes to first parameter.',
      example: 'def add(a, b):\n    return a + b\nprint(add(2, 3))  # 5',
      kidsExplanation: 'Parameters are like empty slots. When you call the function, you fill those slots with real values (arguments).'
    },
    quiz: [
      { type: 'output', question: 'def f(x): return x*2\nprint(f(4))', options: ['4', '8', 'x*2', 'Error'], correct: 1 },
      { type: 'concept', question: 'The values you pass to a function are called ___.', options: ['parameters', 'arguments', 'inputs', 'Both B and C'], correct: 3 },
      { type: 'completion', question: 'Define a function double(n) that returns n*2:', options: ['def double(n): return n*2', 'function double(n): return n*2', 'double(n): return n*2', 'def double: return n*2'], correct: 0 },
      { type: 'output', question: 'def g(a,b): return a-b\nprint(g(10,3))', options: ['7', '10', '3', '-7'], correct: 0 },
      { type: 'concept', question: 'Can a function have more than one parameter?', options: ['No', 'Yes', 'Only two', 'Only in Python 3'], correct: 1 }
    ],
    flashcards: [
      { term: 'Parameter', definition: 'Variable in the function definition that receives a value.', example: 'def add(a, b):' },
      { term: 'Argument', definition: 'Value passed to the function when you call it.', example: 'add(2, 3)' },
      { term: 'Positional', definition: 'Arguments matched by order: first to first, etc.', example: 'add(1, 2)' },
      { term: 'Default value', definition: 'Parameter value used when caller does not pass one.', example: 'def f(x=0):' },
      { term: 'Return value', definition: 'What the function sends back with return.', example: 'return a + b' }
    ],
    challenges: [
      { problem: 'Write a function multiply(a, b) that returns a times b. Call it with 6 and 7 and print the result.', hint: 'def multiply(a,b): return a*b', expectedOutput: '42', difficulty: 'beginner' }
    ]
  }));

  addTopic('python', T({
    id: 'py-modules',
    title: 'Modules and import',
    level: 'intermediate',
    tutorial: {
      explanation: 'A module is a file with Python code. You use it with import module_name and then call module_name.function(). The math module has sqrt, ceil, floor, etc.',
      example: 'import math\nprint(math.sqrt(16))  # 4.0\nprint(math.ceil(2.3))  # 3',
      kidsExplanation: 'A module is like a toolbox. You bring the toolbox (import) and then use the tools inside it (math.sqrt, etc.).'
    },
    quiz: [
      { type: 'output', question: 'import math; print(math.floor(3.7))', options: ['3', '4', '3.7', 'Error'], correct: 0 },
      { type: 'concept', question: 'What does import math do?', options: ['Creates a variable math', 'Loads the math module', 'Defines math', 'Prints math'], correct: 1 },
      { type: 'completion', question: 'To use sqrt from math you write:', options: ['sqrt(4)', 'math.sqrt(4)', 'import sqrt', 'math.import(sqrt)'], correct: 1 },
      { type: 'output', question: 'math.ceil(2.1) returns:', options: ['2', '2.0', '3', '3.0'], correct: 2 },
      { type: 'concept', question: 'Why use module.function() instead of just function() after import?', options: ['Faster', 'Avoid name clashes and show where it comes from', 'Required by law', 'Only for math'], correct: 1 }
    ],
    flashcards: [
      { term: 'Module', definition: 'A file or package containing reusable code.', example: 'import math' },
      { term: 'import', definition: 'Loads a module so you can use its names.', example: 'import os' },
      { term: 'math.sqrt', definition: 'Returns the square root of a number.', example: 'math.sqrt(9)  # 3.0' },
      { term: 'math.ceil', definition: 'Rounds up to the nearest integer.', example: 'math.ceil(2.1)  # 3' },
      { term: 'math.floor', definition: 'Rounds down to the nearest integer.', example: 'math.floor(2.9)  # 2' }
    ],
    challenges: [
      { problem: 'Import math and print the result of math.sqrt(25) and math.ceil(4.2).', hint: 'import math; print(math.sqrt(25)); print(math.ceil(4.2))', expectedOutput: '5.0\\n5', difficulty: 'beginner' }
    ]
  }));

  addTopic('python', T({
    id: 'py-list-comprehension',
    title: 'List Comprehensions',
    level: 'intermediate',
    tutorial: {
      explanation: 'A list comprehension builds a list in one line: [expression for item in sequence]. You can add if condition to filter.',
      example: 'squares = [x*x for x in range(5)]  # [0,1,4,9,16]\nevens = [n for n in [1,2,3,4] if n%2==0]  # [2,4]',
      kidsExplanation: 'It\'s a short way to make a new list by doing something to each item (and maybe keeping only some).'
    },
    quiz: [
      { type: 'output', question: 'What is [x+1 for x in [1,2,3]]?', options: ['[2,3,4]', '[1,2,3]', 'Error', '[1,2,3,1]'], correct: 0 },
      { type: 'concept', question: 'In [x*2 for x in L], what is x?', options: ['The list', 'Each element of L', 'The index', 'Always 0'], correct: 1 },
      { type: 'output', question: '[c for c in "ab"] gives:', options: ['["ab"]', '["a","b"]', '"ab"', 'Error'], correct: 1 },
      { type: 'completion', question: 'List of squares of 0,1,2: ___ for x in range(3)', options: ['[x*x]', '[x**2', '[x*x]', 'squares = [x*x]'], correct: 2 },
      { type: 'output', question: '[n for n in [1,2,3,4] if n>2]', options: ['[1,2]', '[3,4]', '[2,3,4]', '[True,True]'], correct: 1 }
    ],
    flashcards: [
      { term: 'List comprehension', definition: 'Compact way to build a list from a sequence.', example: '[x*2 for x in range(3)]' },
      { term: 'Filter (comprehension)', definition: 'Using if to include only some items.', example: '[x for x in L if x>0]' },
      { term: 'Expression (comprehension)', definition: 'The value computed for each item (e.g. x*x).', example: '[x*x for x in L]' },
      { term: 'Sequence', definition: 'What you iterate over (list, range, string).', example: 'for x in range(5)' },
      { term: 'Nested comprehension', definition: 'Comprehension inside another (e.g. matrix flatten).', example: '[y for row in m for y in row]' }
    ],
    challenges: [
      { problem: 'Create a list of even numbers from 0 to 8 using a list comprehension. Print it.', hint: '[x for x in range(9) if x%2==0]', expectedOutput: '[0, 2, 4, 6, 8]', difficulty: 'intermediate' }
    ]
  }));

  addTopic('python', T({
    id: 'py-string-methods',
    title: 'String Methods',
    level: 'intermediate',
    tutorial: {
      explanation: 'Strings have methods like .upper(), .lower(), .strip(), .split(), .replace(). They return a new string; the original is unchanged.',
      example: 's = "  Hello World  "\nprint(s.strip().upper())  # HELLO WORLD\nprint("a,b,c".split(","))  # ["a","b","c"]',
      kidsExplanation: 'String methods are actions you can do on text: make it all caps, remove spaces, or split into parts.'
    },
    quiz: [
      { type: 'output', question: '"hello".upper() returns:', options: ['hello', 'HELLO', 'Hello', 'error'], correct: 1 },
      { type: 'concept', question: 'What does .strip() do?', options: ['Removes spaces from both ends', 'Removes all spaces', 'Adds spaces', 'Splits string'], correct: 0 },
      { type: 'output', question: '"a-b-c".split("-") returns:', options: ['["a","b","c"]', '"a b c"', 'a-b-c', '["a-b-c"]'], correct: 0 },
      { type: 'completion', question: 'To replace "cat" with "dog" in s: s.___("cat","dog")', options: ['replace', 'swap', 'change', 'sub'], correct: 0 },
      { type: 'output', question: '"Hi".lower() == "hi"', options: ['True', 'False', 'Error', 'None'], correct: 0 }
    ],
    flashcards: [
      { term: '.upper()', definition: 'Returns a new string with all letters uppercase.', example: '"hi".upper()  # "HI"' },
      { term: '.lower()', definition: 'Returns a new string with all letters lowercase.', example: '"HI".lower()  # "hi"' },
      { term: '.strip()', definition: 'Removes leading and trailing whitespace.', example: '"  ok  ".strip()  # "ok"' },
      { term: '.split(sep)', definition: 'Splits string into a list by separator.', example: '"a,b".split(",")  # ["a","b"]' },
      { term: '.replace(old, new)', definition: 'Returns string with old replaced by new.', example: '"hi".replace("i","o")  # "ho"' }
    ],
    challenges: [
      { problem: 'Given s = "  Python  ", print it in uppercase with no leading/trailing spaces.', hint: 's.strip().upper()', expectedOutput: 'PYTHON', difficulty: 'beginner' }
    ]
  }));

  addTopic('python', T({
    id: 'py-file-basics',
    title: 'Reading and Writing Files',
    level: 'intermediate',
    tutorial: {
      explanation: 'Open a file with open(path, "r") to read or open(path, "w") to write. Use with so the file is closed automatically. read() gets full content; readlines() gets lines.',
      example: 'with open("out.txt", "w") as f:\n    f.write("Hello")\nwith open("out.txt", "r") as f:\n    print(f.read())  # Hello',
      kidsExplanation: 'Files are like notebooks. You can open one to read what\'s inside or to write something new.'
    },
    quiz: [
      { type: 'concept', question: 'Which mode is for writing (overwrites file)?', options: ['"r"', '"w"', '"a"', '"read"'], correct: 1 },
      { type: 'output', question: 'After f = open("x","w"); f.write("ab"); f.close(), file "x" contains:', options: ['ab', 'x', 'w', 'nothing'], correct: 0 },
      { type: 'concept', question: 'Why use "with open(...) as f"?', options: ['Faster', 'Automatically closes file', 'Required', 'Only for reading'], correct: 1 },
      { type: 'completion', question: 'To read entire file as one string: f.___()', options: ['read', 'readall', 'get', 'load'], correct: 0 },
      { type: 'concept', question: '"a" mode does what?', options: ['Read only', 'Write from start', 'Append to end', 'Delete file'], correct: 2 }
    ],
    flashcards: [
      { term: 'open()', definition: 'Opens a file; returns a file object.', example: 'open("file.txt", "r")' },
      { term: 'read()', definition: 'Reads entire file content as a string.', example: 'content = f.read()' },
      { term: 'write()', definition: 'Writes a string to the file.', example: 'f.write("text")' },
      { term: 'with statement', definition: 'Ensures file is closed when block ends.', example: 'with open(...) as f:' },
      { term: 'readlines()', definition: 'Returns list of lines (with newlines).', example: 'lines = f.readlines()' }
    ],
    challenges: [
      { problem: 'Write "Hello, File!" to a file named hello.txt. Then read and print its contents.', hint: 'with open("hello.txt","w") as f: f.write("Hello, File!")', expectedOutput: 'Hello, File!', difficulty: 'intermediate' }
    ]
  }));

  addTopic('python', T({
    id: 'py-exceptions',
    title: 'Try and Except',
    level: 'advanced',
    tutorial: {
      explanation: 'Use try: and except: to handle errors. Code in try runs; if an exception occurs, the except block runs instead of crashing. You can name the exception: except ValueError as e.',
      example: 'try:\n    n = int("abc")\nexcept ValueError:\n    print("Not a number")  # Not a number',
      kidsExplanation: 'Try/except is like "try this; if something goes wrong, do this instead" so the program doesn\'t stop.'
    },
    quiz: [
      { type: 'output', question: 'try: print(1); except: print(2). Output?', options: ['1', '2', '1 2', 'Error'], correct: 0 },
      { type: 'concept', question: 'What does except do?', options: ['Prevents errors', 'Runs when an error occurs in try', 'Stops the program', 'Prints errors'], correct: 1 },
      { type: 'output', question: 'try: x=1/0; except: print("oops"). Output?', options: ['Error', 'oops', '0', '1'], correct: 1 },
      { type: 'completion', question: 'To catch only ValueError: except ___:', options: ['Error', 'ValueError', 'Exception', 'Any'], correct: 1 },
      { type: 'concept', question: 'After except block runs, does the program continue?', options: ['No, it exits', 'Yes, with next statement after try/except', 'Only if return', 'Only in main'], correct: 1 }
    ],
    flashcards: [
      { term: 'try', definition: 'Block where you expect possible errors.', example: 'try: risky()' },
      { term: 'except', definition: 'Block that runs when an exception occurs.', example: 'except ValueError: ...' },
      { term: 'Exception', definition: 'An error that can be caught and handled.', example: 'ValueError, TypeError' },
      { term: 'raise', definition: 'Used to throw an exception manually.', example: 'raise ValueError("bad")' },
      { term: 'finally', definition: 'Block that runs whether or not an exception occurred.', example: 'finally: cleanup()' }
    ],
    challenges: [
      { problem: 'Use try/except: try to convert user input "abc" to int; on ValueError print "Invalid number".', hint: 'try: int("abc") except ValueError: print("Invalid number")', expectedOutput: 'Invalid number', difficulty: 'intermediate' }
    ]
  }));

  // ----- Java -----
  addTopic('java', T({
    id: 'java-variables',
    title: 'Variables and Types',
    level: 'beginner',
    tutorial: {
      explanation: 'In Java you declare a variable with its type and name, then assign a value. Types include int, double, boolean, String. Example: int age = 10;',
      example: 'int count = 0;\ndouble price = 9.99;\nString name = "Java";\nSystem.out.println(count);  // 0',
      kidsExplanation: 'In Java we tell the computer what kind of thing we are storing (number, text) and give it a name. Like labeling a box with "apples" and putting 5 in it.'
    },
    quiz: [
      { type: 'output', question: 'int x = 5; System.out.print(x); prints:', options: ['x', '5', 'int', 'Error'], correct: 1 },
      { type: 'concept', question: 'Which is a valid Java type for whole numbers?', options: ['number', 'int', 'integer', 'num'], correct: 1 },
      { type: 'completion', question: 'Declare a variable score of type int with value 100:', options: ['int score = 100;', 'score = 100;', 'var score = 100;', 'integer score 100;'], correct: 0 },
      { type: 'output', question: 'String s = "Hi"; System.out.println(s.length());', options: ['Hi', '2', 's', 'Error'], correct: 1 },
      { type: 'concept', question: 'In Java, String is:', options: ['A primitive type', 'A class (reference type)', 'A keyword', 'Optional'], correct: 1 }
    ],
    flashcards: [
      { term: 'Declaration', definition: 'Stating the type and name of a variable.', example: 'int x;' },
      { term: 'int', definition: 'Primitive type for whole numbers.', example: 'int n = 42;' },
      { term: 'double', definition: 'Primitive type for decimal numbers.', example: 'double d = 3.14;' },
      { term: 'String', definition: 'Reference type for text (capital S).', example: 'String s = "hello";' },
      { term: 'System.out.println', definition: 'Prints a line to the console.', example: 'System.out.println("Hi");' }
    ],
    challenges: [
      { problem: 'Declare an int variable age with value 12 and a String variable name with value "Alex". Print both.', hint: 'int age = 12; String name = "Alex"; System.out.println(age + " " + name);', expectedOutput: '12 Alex', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-arrays',
    title: 'Arrays',
    level: 'beginner',
    tutorial: {
      explanation: 'An array holds a fixed number of elements of the same type. Create with new int[size] or int[] a = {1,2,3}. Index from 0; length is a.length.',
      example: 'int[] nums = {10, 20, 30};\nSystem.out.println(nums[1]);  // 20\nSystem.out.println(nums.length);  // 3',
      kidsExplanation: 'An array is like a row of numbered boxes. Each box holds one value. The first box is number 0.'
    },
    quiz: [
      { type: 'output', question: 'int[] a = {5,10,15}; System.out.println(a[0]);', options: ['5', '10', '0', 'Error'], correct: 0 },
      { type: 'concept', question: 'How do you get the length of array arr in Java?', options: ['arr.size()', 'arr.length', 'length(arr)', 'arr.length()'], correct: 1 },
      { type: 'completion', question: 'Create an array of 3 integers: int[] a = ___', options: ['[1,2,3]', 'new int[3]', '{1,2,3}', 'new int{1,2,3}'], correct: 2 },
      { type: 'output', question: 'int[] x = new int[2]; System.out.println(x[0]);', options: ['null', '0', '2', 'Error'], correct: 1 },
      { type: 'concept', question: 'Array indices in Java start at:', options: ['1', '0', '-1', 'Any'], correct: 1 }
    ],
    flashcards: [
      { term: 'Array', definition: 'Fixed-size sequence of same-type elements.', example: 'int[] a = {1,2,3};' },
      { term: 'new int[n]', definition: 'Creates an array of n ints (default 0).', example: 'int[] a = new int[5];' },
      { term: 'Array index', definition: 'Position; 0 to length-1.', example: 'a[0]' },
      { term: 'length', definition: 'Field (not method) giving array size.', example: 'a.length' },
      { term: 'Array initializer', definition: 'Shorthand: int[] a = {1,2,3};', example: '{1,2,3}' }
    ],
    challenges: [
      { problem: 'Create an int array with values 1, 2, 3. Print the second element (index 1) and the length.', hint: 'int[] a = {1,2,3}; System.out.println(a[1]); System.out.println(a.length);', expectedOutput: '2\\n3', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-if-else',
    title: 'If and Else',
    level: 'beginner',
    tutorial: {
      explanation: 'Use if (condition) { } for one branch; add else { } for the other. Condition must be boolean. Use == for equality, != for not equal.',
      example: 'int x = 5;\nif (x > 3) {\n    System.out.println("big");\n} else {\n    System.out.println("small");\n}  // big',
      kidsExplanation: 'If/else lets the computer choose: "If this is true, do this; otherwise do that."'
    },
    quiz: [
      { type: 'output', question: 'int n=4; if(n>3) System.out.print("A"); else System.out.print("B");', options: ['A', 'B', 'AB', 'Error'], correct: 0 },
      { type: 'concept', question: 'Which checks equality in Java?', options: ['=', '==', 'eq', 'equals'], correct: 1 },
      { type: 'completion', question: 'To test "a is not equal to b":', options: ['a != b', 'a not b', 'a <> b', '!a == b'], correct: 0 },
      { type: 'output', question: 'if (true) System.out.print("X"); System.out.print("Y");', options: ['X', 'Y', 'XY', 'YX'], correct: 2 },
      { type: 'concept', question: 'Condition in if () must be of type:', options: ['int', 'boolean', 'String', 'any'], correct: 1 }
    ],
    flashcards: [
      { term: 'if', definition: 'Executes block when condition is true.', example: 'if (x > 0) { }' },
      { term: 'else', definition: 'Executes when if condition is false.', example: 'else { }' },
      { term: 'boolean', definition: 'Type for true/false.', example: 'boolean ok = true;' },
      { term: '==', definition: 'Compares two values for equality.', example: 'x == 5' },
      { term: '!=', definition: 'Not equal.', example: 'x != 0' }
    ],
    challenges: [
      { problem: 'Set int score = 85. If score >= 80 print "Pass", else print "Fail".', hint: 'if (score >= 80) System.out.println("Pass"); else ...', expectedOutput: 'Pass', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-for-loop',
    title: 'For Loops',
    level: 'beginner',
    tutorial: {
      explanation: 'for (init; condition; update) { body } runs init once, then repeats: check condition, run body, run update. Classic: for (int i=0; i<n; i++).',
      example: 'for (int i = 0; i < 3; i++) {\n    System.out.println(i);  // 0, 1, 2\n}',
      kidsExplanation: 'A for loop counts: start at 0, do something, add 1, and keep going until we reach the limit.'
    },
    quiz: [
      { type: 'output', question: 'for(int i=0;i<2;i++) System.out.print(i);', options: ['0', '01', '012', '2'], correct: 1 },
      { type: 'concept', question: 'In for(A;B;C) what runs after each iteration?', options: ['A', 'B', 'C', 'body'], correct: 2 },
      { type: 'completion', question: 'Loop from 0 to 4: for (int i = 0; i < ___; i++)', options: ['4', '5', '<=4', 'i<5'], correct: 1 },
      { type: 'output', question: 'int s=0; for(int i=1;i<=3;i++) s+=i; System.out.println(s);', options: ['3', '6', '1', '0'], correct: 1 },
      { type: 'concept', question: 'i++ means:', options: ['i = i + 1', 'i = 1', 'i + 1 only', 'i - 1'], correct: 0 }
    ],
    flashcards: [
      { term: 'for loop', definition: 'Init, condition, update, then body; repeat while condition true.', example: 'for (int i=0; i<5; i++)' },
      { term: 'i++', definition: 'Increment i by 1 (post-increment).', example: 'i++' },
      { term: 'Loop variable', definition: 'Variable that changes each iteration (e.g. i).', example: 'int i = 0' },
      { term: 'Enhanced for', definition: 'for (Type item : array) to iterate over array.', example: 'for (int x : arr)' },
      { term: 'break', definition: 'Exits the loop immediately.', example: 'if (done) break;' }
    ],
    challenges: [
      { problem: 'Use a for loop to print 0, 1, 2, 3, 4 (each on its own line).', hint: 'for (int i=0; i<5; i++) System.out.println(i);', expectedOutput: '0\\n1\\n2\\n3\\n4', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-methods',
    title: 'Methods',
    level: 'beginner',
    tutorial: {
      explanation: 'A method is a block of code inside a class. Declare with returnType name(params) { body }. Use return to send a value back; void means no return value.',
      example: 'public static int add(int a, int b) {\n    return a + b;\n}\nSystem.out.println(add(2, 3));  // 5',
      kidsExplanation: 'A method is like a helper. You give it a name and some inputs; it does work and can give you an answer.'
    },
    quiz: [
      { type: 'output', question: 'static int f() { return 10; } System.out.println(f());', options: ['f()', '10', '0', 'Error'], correct: 1 },
      { type: 'concept', question: 'void means the method returns:', options: ['0', 'null', 'nothing', 'void'], correct: 2 },
      { type: 'completion', question: 'Define a method double that takes int n and returns n*2:', options: ['int double(int n) { return n*2; }', 'double(int n) { return n*2; }', 'int double(n) { return n*2; }', 'method double(n) return n*2;'], correct: 0 },
      { type: 'output', question: 'static void say() { System.out.print("Hi"); } say(); say();', options: ['Hi', 'HiHi', 'Hi Hi', 'Error'], correct: 1 },
      { type: 'concept', question: 'Parameters are declared with type and name:', options: ['int n', 'n', 'param n', 'var n'], correct: 0 }
    ],
    flashcards: [
      { term: 'Method', definition: 'Named block of code that can take parameters and return a value.', example: 'int add(int a, int b) { return a+b; }' },
      { term: 'return', definition: 'Sends a value back and exits the method.', example: 'return 42;' },
      { term: 'void', definition: 'Return type meaning "no value returned".', example: 'void print() { }' },
      { term: 'Parameter', definition: 'Variable in the method signature that receives an argument.', example: 'int add(int a, int b)' },
      { term: 'Argument', definition: 'Value passed when calling the method.', example: 'add(2, 3)' }
    ],
    challenges: [
      { problem: 'Write a static method square that takes an int n and returns n*n. Call it with 5 and print the result.', hint: 'static int square(int n) { return n*n; }', expectedOutput: '25', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-classes',
    title: 'Classes and Objects',
    level: 'intermediate',
    tutorial: {
      explanation: 'A class is a blueprint; an object is an instance. Define fields (variables) and methods. Create objects with new ClassName().',
      example: 'class Dog {\n    String name;\n    void bark() { System.out.println("Woof"); }\n}\nDog d = new Dog();\nd.name = "Max";\nd.bark();',
      kidsExplanation: 'A class is like a cookie cutter; objects are the cookies. Each cookie can have its own name or color (fields) and can do things (methods).'
    },
    quiz: [
      { type: 'concept', question: 'new Dog() creates:', options: ['A class', 'An object', 'A method', 'A variable'], correct: 1 },
      { type: 'output', question: 'Dog d = new Dog(); d.name = "A"; System.out.println(d.name); (assuming Dog has String name)', options: ['Dog', 'A', 'null', 'Error'], correct: 1 },
      { type: 'completion', question: 'To create an object of class Car:', options: ['Car c;', 'Car c = new Car();', 'new Car c;', 'Car.new();'], correct: 1 },
      { type: 'concept', question: 'Fields in a class hold:', options: ['Only numbers', 'State (data) for each object', 'Methods', 'Nothing'], correct: 1 },
      { type: 'concept', question: 'Each object has its own copy of:', options: ['The class', 'Instance fields', 'Static methods', 'The blueprint'], correct: 1 }
    ],
    flashcards: [
      { term: 'Class', definition: 'Blueprint that defines fields and methods.', example: 'class Cat { }' },
      { term: 'Object', definition: 'Instance of a class created with new.', example: 'Cat c = new Cat();' },
      { term: 'Field', definition: 'Variable that belongs to each object.', example: 'String name;' },
      { term: 'new', definition: 'Keyword that creates a new object.', example: 'new Dog()' },
      { term: 'Instance', definition: 'One specific object of a class.', example: 'Dog d = new Dog();' }
    ],
    challenges: [
      { problem: 'Define a class Book with a String field title. In main, create a Book, set title to "Java", and print it.', hint: 'Book b = new Book(); b.title = "Java"; System.out.println(b.title);', expectedOutput: 'Java', difficulty: 'intermediate' }
    ]
  }));

  addTopic('java', T({
    id: 'java-constructors',
    title: 'Constructors',
    level: 'intermediate',
    tutorial: {
      explanation: 'A constructor runs when you create an object with new. It has the same name as the class and no return type. Use it to set initial values.',
      example: 'class Person {\n    String name;\n    Person(String n) { name = n; }\n}\nPerson p = new Person("Alice");\nSystem.out.println(p.name);  // Alice',
      kidsExplanation: 'A constructor is like the setup when you open a new toy: it gets everything ready (name, color) when the object is created.'
    },
    quiz: [
      { type: 'concept', question: 'Constructor name must match:', options: ['main', 'The class name', 'Object', 'new'], correct: 1 },
      { type: 'output', question: 'Person(String n){ name=n; } Person p=new Person("Bob"); System.out.println(p.name);', options: ['Bob', 'n', 'null', 'Error'], correct: 0 },
      { type: 'completion', question: 'A constructor has no ___ type.', options: ['return', 'void', 'class', 'name'], correct: 0 },
      { type: 'concept', question: 'If you do not write a constructor, Java provides:', options: ['Nothing', 'A default no-arg constructor', 'An error', 'A random one'], correct: 1 },
      { type: 'output', question: 'How many times does a constructor run per object?', options: ['0', '1', 'Every method call', 'Forever'], correct: 1 }
    ],
    flashcards: [
      { term: 'Constructor', definition: 'Special method that runs when object is created.', example: 'Person(String n) { name = n; }' },
      { term: 'Default constructor', definition: 'No-arg constructor Java adds if you write none.', example: 'Person() { }' },
      { term: 'Parameterized constructor', definition: 'Constructor that takes arguments.', example: 'Person(String name)' },
      { term: 'Initialization', definition: 'Setting up an object when it is created.', example: 'this.x = x;' },
      { term: 'this', definition: 'Refers to the current object inside the class.', example: 'this.name = name;' }
    ],
    challenges: [
      { problem: 'Add a constructor to class Car that takes a String model and assigns it to field model. Create a Car with model "Sedan" and print model.', hint: 'Car(String model) { this.model = model; }', expectedOutput: 'Sedan', difficulty: 'intermediate' }
    ]
  }));

  addTopic('java', T({
    id: 'java-arraylist',
    title: 'ArrayList',
    level: 'intermediate',
    tutorial: {
      explanation: 'ArrayList is a resizable list. Import java.util.ArrayList. Create with new ArrayList<>(). Use add(), get(i), size(), remove().',
      example: 'ArrayList<String> list = new ArrayList<>();\nlist.add("a");\nlist.add("b");\nSystem.out.println(list.get(1));  // b\nSystem.out.println(list.size());  // 2',
      kidsExplanation: 'ArrayList is like a growable row of boxes. You can add more boxes or take some away, and ask "what is in box 2?" or "how many boxes?"'
    },
    quiz: [
      { type: 'output', question: 'ArrayList<Integer> L = new ArrayList<>(); L.add(1); L.add(2); System.out.println(L.get(0));', options: ['0', '1', '2', 'Error'], correct: 1 },
      { type: 'concept', question: 'ArrayList size is obtained with:', options: ['length', 'length()', 'size()', 'size'], correct: 2 },
      { type: 'completion', question: 'Add element 5 to ArrayList list:', options: ['list.add(5);', 'list.insert(5);', 'list.push(5);', 'list[0]=5;'], correct: 0 },
      { type: 'output', question: 'ArrayList<String> s = new ArrayList<>(); System.out.println(s.size());', options: ['null', '0', '1', 'Error'], correct: 1 },
      { type: 'concept', question: 'ArrayList<>() uses:', options: ['No type', 'Generics (type in <>)', 'Array type', 'Object only'], correct: 1 }
    ],
    flashcards: [
      { term: 'ArrayList', definition: 'Resizable list from java.util.', example: 'ArrayList<String> list = new ArrayList<>();' },
      { term: 'add()', definition: 'Appends an element to the list.', example: 'list.add("x");' },
      { term: 'get(i)', definition: 'Returns element at index i.', example: 'list.get(0)' },
      { term: 'size()', definition: 'Returns number of elements.', example: 'list.size()' },
      { term: 'Generics', definition: 'Type in angle brackets: ArrayList<Integer>.', example: 'ArrayList<Integer>' }
    ],
    challenges: [
      { problem: 'Create an ArrayList of String. Add "Hello" and "World". Print the first element and the size.', hint: 'list.get(0) and list.size()', expectedOutput: 'Hello\\n2', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-switch',
    title: 'Switch Statement',
    level: 'beginner',
    tutorial: {
      explanation: 'switch(expression) matches against case values. Use break to exit after a case; otherwise execution falls through to the next case.',
      example: 'int day = 2;\nswitch (day) {\n    case 1: System.out.println("Mon"); break;\n    case 2: System.out.println("Tue"); break;\n    default: System.out.println("Other");\n}  // Tue',
      kidsExplanation: 'Switch is like a menu: "If the choice is 1 do this, if 2 do that, otherwise do the default."'
    },
    quiz: [
      { type: 'output', question: 'int x=1; switch(x){ case 1: System.out.print("A"); break; case 2: System.out.print("B"); }', options: ['A', 'B', 'AB', 'Error'], correct: 0 },
      { type: 'concept', question: 'What does break do in a switch case?', options: ['Stops the program', 'Exits the switch', 'Continues to next case', 'Restarts switch'], correct: 1 },
      { type: 'output', question: 'Without break: case 1: print("1"); case 2: print("2"); with x=1', options: ['1', '2', '12', '21'], correct: 2 },
      { type: 'completion', question: 'Handle any other value in switch: ___ : code', options: ['else', 'default', 'other', 'case default'], correct: 1 },
      { type: 'concept', question: 'switch can work with (primitive):', options: ['Only int', 'int, char, String (and compatible)', 'Only String', 'Any type'], correct: 1 }
    ],
    flashcards: [
      { term: 'switch', definition: 'Multi-way branch based on a value.', example: 'switch (x) { }' },
      { term: 'case', definition: 'Label for a matching value.', example: 'case 1: ...' },
      { term: 'break', definition: 'Exits the switch (prevents fall-through).', example: 'break;' },
      { term: 'default', definition: 'Branch when no case matches.', example: 'default: ...' },
      { term: 'Fall-through', definition: 'When one case runs into the next (no break).', example: 'case 1: case 2: ...' }
    ],
    challenges: [
      { problem: 'Use switch: if code is 1 print "One", 2 print "Two", else "Other". Set code=2 and run.', hint: 'switch(code) { case 1: ... case 2: ... default: ... }', expectedOutput: 'Two', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-while',
    title: 'While Loops',
    level: 'beginner',
    tutorial: {
      explanation: 'while (condition) { body } repeats the body while the condition is true. Check condition before each iteration.',
      example: 'int i = 0;\nwhile (i < 3) {\n    System.out.println(i);\n    i++;\n}  // 0, 1, 2',
      kidsExplanation: 'While means "keep doing this as long as something is true." Like "while you have homework, keep working."'
    },
    quiz: [
      { type: 'output', question: 'int n=0; while(n<2){ System.out.print(n); n++; }', options: ['0', '01', '012', '2'], correct: 1 },
      { type: 'concept', question: 'When is the while condition checked?', options: ['Once', 'Before each iteration', 'After each iteration', 'Never'], correct: 1 },
      { type: 'completion', question: 'To avoid infinite loop you must ___ the condition variable:', options: ['print', 'change', 'check', 'ignore'], correct: 1 },
      { type: 'output', question: 'int x=3; while(x>0) x--; System.out.println(x);', options: ['3', '1', '0', '-1'], correct: 2 },
      { type: 'concept', question: 'while(true) with no break inside:', options: ['Runs once', 'Runs 100 times', 'Runs forever', 'Error'], correct: 2 }
    ],
    flashcards: [
      { term: 'while', definition: 'Loop that runs while condition is true.', example: 'while (x < 5) { }' },
      { term: 'Condition (while)', definition: 'Boolean expression checked each time.', example: 'i < 10' },
      { term: 'Infinite loop', definition: 'Loop that never stops (condition never false).', example: 'while (true)' },
      { term: 'Loop body', definition: 'Code that runs each iteration.', example: '{ System.out.println(i); i++; }' },
      { term: 'Iteration', definition: 'One pass through the loop.', example: 'Each run of the body' }
    ],
    challenges: [
      { problem: 'Use while: start at 1, print and increment until value is 4. Print 1, 2, 3.', hint: 'int n=1; while(n<4) { System.out.println(n); n++; }', expectedOutput: '1\\n2\\n3', difficulty: 'beginner' }
    ]
  }));

  addTopic('java', T({
    id: 'java-inheritance',
    title: 'Inheritance',
    level: 'advanced',
    tutorial: {
      explanation: 'A subclass extends a superclass and inherits its fields and methods. Use extends keyword. super() calls the parent constructor.',
      example: 'class Animal { void speak() { System.out.println("..."); } }\nclass Dog extends Animal { void speak() { System.out.println("Woof"); } }\nDog d = new Dog(); d.speak();  // Woof',
      kidsExplanation: 'Inheritance is like a family: a Dog "is a" kind of Animal, so it can do everything an Animal does, plus its own things.'
    },
    quiz: [
      { type: 'concept', question: 'Keyword for inheritance in Java:', options: ['inherits', 'extends', 'super', 'parent'], correct: 1 },
      { type: 'output', question: 'class B extends A { } B b = new B(); Is b an instance of A?', options: ['No', 'Yes', 'Only in main', 'Error'], correct: 1 },
      { type: 'completion', question: 'Class Child extends Parent. To call Parent constructor from Child: ___', options: ['parent();', 'super();', 'Parent();', 'call Parent();'], correct: 1 },
      { type: 'concept', question: 'Overriding a method means:', options: ['Deleting it', 'Subclass provides its own version', 'Making it private', 'Copying it'], correct: 1 },
      { type: 'concept', question: 'super refers to:', options: ['Current class', 'Parent class', 'Child class', 'Object'], correct: 1 }
    ],
    flashcards: [
      { term: 'extends', definition: 'Keyword to make a class inherit from another.', example: 'class Dog extends Animal' },
      { term: 'Subclass', definition: 'Class that extends another (child).', example: 'Dog' },
      { term: 'Superclass', definition: 'Class that is extended (parent).', example: 'Animal' },
      { term: 'super()', definition: 'Calls the parent class constructor.', example: 'super(name);' },
      { term: 'Override', definition: 'Subclass defines same method as parent.', example: 'void speak() { ... }' }
    ],
    challenges: [
      { problem: 'Create class Vehicle with method drive() that prints "Driving". Create class Car extends Vehicle and override drive() to print "Car driving". Create Car and call drive().', hint: 'class Car extends Vehicle { void drive() { System.out.println("Car driving"); } }', expectedOutput: 'Car driving', difficulty: 'intermediate' }
    ]
  }));

  addTopic('java', T({
    id: 'java-string-methods',
    title: 'String Methods',
    level: 'intermediate',
    tutorial: {
      explanation: 'String has methods like length(), charAt(i), substring(start,end), indexOf(s), toLowerCase(), toUpperCase(), equals(s). Strings are immutable.',
      example: 'String s = "Hello";\nSystem.out.println(s.length());      // 5\nSystem.out.println(s.toUpperCase());  // HELLO\nSystem.out.println(s.charAt(1));      // e',
      kidsExplanation: 'String methods are actions on text: get length, get one letter, make uppercase, find where a word appears.'
    },
    quiz: [
      { type: 'output', question: '"Hi".length() returns:', options: ['Hi', '2', '0', 'Error'], correct: 1 },
      { type: 'concept', question: 'To compare two strings by value use:', options: ['==', 'equals()', 'compare', '='], correct: 1 },
      { type: 'output', question: '"hello".charAt(0) is:', options: ['0', 'h', 'hello', 'Error'], correct: 1 },
      { type: 'completion', question: 'Get substring from index 1 to 4 of String s:', options: ['s.sub(1,4)', 's.substring(1,4)', 's.slice(1,4)', 's.substring(1,3)'], correct: 1 },
      { type: 'concept', question: 'Strings in Java are:', options: ['Mutable', 'Immutable', 'Arrays', 'Primitives'], correct: 1 }
    ],
    flashcards: [
      { term: 'length()', definition: 'Returns number of characters in the string.', example: '"abc".length()  // 3' },
      { term: 'charAt(i)', definition: 'Returns character at index i.', example: '"Hi".charAt(1)  // \'i\'' },
      { term: 'substring(a,b)', definition: 'Returns substring from a to b (b exclusive).', example: '"hello".substring(1,4)  // "ell"' },
      { term: 'equals(s)', definition: 'Compares content of two strings.', example: 's1.equals(s2)' },
      { term: 'toUpperCase()', definition: 'Returns new string in uppercase.', example: '"hi".toUpperCase()  // "HI"' }
    ],
    challenges: [
      { problem: 'Given String s = "Java", print its length, first character, and uppercase version.', hint: 's.length(), s.charAt(0), s.toUpperCase()', expectedOutput: '4\\nJ\\nJAVA', difficulty: 'beginner' }
    ]
  }));

  // ----- C++ -----
  addTopic('cpp', T({
    id: 'cpp-variables',
    title: 'Variables and Types',
    level: 'beginner',
    tutorial: { explanation: 'In C++ you declare a variable with its type and name. Common types: int, double, char, string (from <string>). Example: int x = 5;', example: 'int count = 0;\ndouble price = 9.99;\nstd::string name = "C++";\nstd::cout << count;', kidsExplanation: 'A variable is a named box. You tell the computer what type of thing goes in (number, text) and give it a name.' },
    quiz: [
      { type: 'output', question: 'int x = 5; std::cout << x; prints:', options: ['x', '5', 'int', 'Error'], correct: 1 },
      { type: 'concept', question: 'Which is a C++ type for whole numbers?', options: ['number', 'int', 'integer', 'num'], correct: 1 },
      { type: 'completion', question: 'Declare an int variable score with value 100:', options: ['int score = 100;', 'score = 100;', 'var score = 100;', 'integer score 100;'], correct: 0 },
      { type: 'concept', question: 'For text in C++ we often use:', options: ['char only', 'std::string', 'text', 'str'], correct: 1 },
      { type: 'output', question: 'double d = 3.14; std::cout << d;', options: ['3', '3.14', '3.1', 'Error'], correct: 1 }
    ],
    flashcards: [
      { term: 'int', definition: 'Type for integers.', example: 'int n = 42;' },
      { term: 'double', definition: 'Type for floating-point numbers.', example: 'double d = 3.14;' },
      { term: 'std::string', definition: 'Type for text (from <string>).', example: 'std::string s = "hi";' },
      { term: 'std::cout', definition: 'Standard output stream for printing.', example: 'std::cout << x;' },
      { term: 'Declaration', definition: 'Stating type and name of a variable.', example: 'int x;' }
    ],
    challenges: [{ problem: 'Declare int age = 10 and std::string name = "Alex". Print both using std::cout.', hint: 'std::cout << age << " " << name;', expectedOutput: '10 Alex', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-pointers',
    title: 'Pointers',
    level: 'intermediate',
    tutorial: { explanation: 'A pointer holds the address of another variable. Declare with type* name. Get address with &var; get value with *ptr.', example: 'int x = 10;\nint* p = &x;\nstd::cout << *p;  // 10', kidsExplanation: 'A pointer is like a note that says "the number is in box 7." You use * to look inside that box.' },
    quiz: [
      { type: 'concept', question: '&x gives:', options: ['Value of x', 'Address of x', 'Reference to x', 'Copy of x'], correct: 1 },
      { type: 'output', question: 'int a=5; int* p=&a; std::cout << *p;', options: ['5', 'address', 'p', 'Error'], correct: 0 },
      { type: 'completion', question: 'Declare a pointer to int named ptr:', options: ['int ptr;', 'int* ptr;', 'pointer ptr;', 'int &ptr;'], correct: 1 },
      { type: 'concept', question: '*ptr when ptr is a pointer gives:', options: ['Address', 'Value at that address', 'Pointer', 'Error'], correct: 1 },
      { type: 'output', question: 'int x=3; int* p=&x; *p=7; std::cout << x;', options: ['3', '7', 'x', 'Error'], correct: 1 }
    ],
    flashcards: [
      { term: 'Pointer', definition: 'Variable that holds an address.', example: 'int* p;' },
      { term: '& (address-of)', definition: 'Operator that gives the address of a variable.', example: '&x' },
      { term: '* (dereference)', definition: 'Operator that gets the value at the address.', example: '*p' },
      { term: 'nullptr', definition: 'Pointer that points to nothing.', example: 'int* p = nullptr;' },
      { term: 'Dereference', definition: 'Accessing the value a pointer points to.', example: '*p' }
    ],
    challenges: [{ problem: 'Create int n = 20 and a pointer p that points to n. Print the value of n using the pointer.', hint: 'int* p = &n; std::cout << *p;', expectedOutput: '20', difficulty: 'intermediate' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-arrays',
    title: 'Arrays',
    level: 'beginner',
    tutorial: { explanation: 'An array holds a fixed number of elements of the same type. Declare as type name[size]. Index from 0.', example: 'int arr[3] = {10, 20, 30};\nstd::cout << arr[1];  // 20', kidsExplanation: 'An array is a row of boxes. Each box has a number (0, 1, 2...) and holds one value.' },
    quiz: [
      { type: 'output', question: 'int a[3] = {5,10,15}; std::cout << a[0];', options: ['5', '10', '0', 'Error'], correct: 0 },
      { type: 'concept', question: 'Array indices in C++ start at:', options: ['1', '0', '-1', 'Any'], correct: 1 },
      { type: 'completion', question: 'Create an array of 5 ints initialized to 0:', options: ['int a[5] = {};', 'int a[5] = {0};', 'int a[5];', 'Any of these'], correct: 3 },
      { type: 'output', question: 'int x[2] = {1,2}; std::cout << x[1];', options: ['1', '2', '0', 'Error'], correct: 1 },
      { type: 'concept', question: 'Size of array must be:', options: ['Variable', 'Constant at compile time', 'Zero', 'Odd'], correct: 1 }
    ],
    flashcards: [
      { term: 'Array', definition: 'Fixed-size sequence of same type.', example: 'int a[5];' },
      { term: 'Array initializer', definition: 'int a[] = {1,2,3};', example: '{1,2,3}' },
      { term: 'Index', definition: 'Position from 0 to size-1.', example: 'a[0]' },
      { term: 'Bounds', definition: 'Valid indices; going out of bounds is undefined.', example: 'a[0] to a[size-1]' },
      { term: 'sizeof', definition: 'Operator that gives size in bytes (e.g. sizeof(arr)).', example: 'sizeof(a)' }
    ],
    challenges: [{ problem: 'Create int array with values 1, 2, 3. Print the second element (index 1).', hint: 'int a[3] = {1,2,3}; std::cout << a[1];', expectedOutput: '2', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-if-else',
    title: 'If and Else',
    level: 'beginner',
    tutorial: { explanation: 'Use if (condition) { } for one branch; else { } for the other. Conditions use ==, !=, <, >, <=, >=.', example: 'int x = 5;\nif (x > 3) std::cout << "big";\nelse std::cout << "small";  // big', kidsExplanation: 'If/else lets the computer choose: "If this is true, do this; else do that."' },
    quiz: [
      { type: 'output', question: 'int n=4; if(n>3) std::cout<<"A"; else std::cout<<"B";', options: ['A', 'B', 'AB', 'Error'], correct: 0 },
      { type: 'concept', question: 'Equality in C++ is checked with:', options: ['=', '==', 'eq', 'equals'], correct: 1 },
      { type: 'completion', question: 'Test "a not equal to b":', options: ['a != b', 'a not b', 'a <> b', '!a == b'], correct: 0 },
      { type: 'output', question: 'if (true) std::cout << "X"; std::cout << "Y";', options: ['X', 'Y', 'XY', 'YX'], correct: 2 },
      { type: 'concept', question: 'Condition in if () must be:', options: ['int', 'bool (or convertible)', 'string', 'any'], correct: 1 }
    ],
    flashcards: [
      { term: 'if', definition: 'Runs block when condition is true.', example: 'if (x > 0) { }' },
      { term: 'else', definition: 'Runs when if condition is false.', example: 'else { }' },
      { term: 'bool', definition: 'Type for true/false.', example: 'bool ok = true;' },
      { term: '==', definition: 'Equality comparison.', example: 'x == 5' },
      { term: '!=', definition: 'Not equal.', example: 'x != 0' }
    ],
    challenges: [{ problem: 'Set int score = 75. If score >= 60 print "Pass", else "Fail".', hint: 'if (score >= 60) std::cout << "Pass"; else ...', expectedOutput: 'Pass', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-for-loop',
    title: 'For Loops',
    level: 'beginner',
    tutorial: { explanation: 'for (init; condition; update) { body } runs init once, then repeats: check condition, run body, run update.', example: 'for (int i = 0; i < 3; i++)\n    std::cout << i;  // 012', kidsExplanation: 'A for loop counts: start, do something, add 1, repeat until the condition is false.' },
    quiz: [
      { type: 'output', question: 'for(int i=0;i<2;i++) std::cout<<i;', options: ['0', '01', '012', '2'], correct: 1 },
      { type: 'concept', question: 'i++ means:', options: ['i = i + 1', 'i = 1', 'i + 1 only', 'i - 1'], correct: 0 },
      { type: 'completion', question: 'Loop from 0 to 4: for (int i = 0; i < ___; i++)', options: ['4', '5', '<=4', 'i<5'], correct: 1 },
      { type: 'output', question: 'int s=0; for(int i=1;i<=3;i++) s+=i; std::cout<<s;', options: ['3', '6', '1', '0'], correct: 1 },
      { type: 'concept', question: 'Scope of loop variable in for(int i=0;...):', options: ['Global', 'Only inside the loop (C++99+)', 'Forever', 'Main only'], correct: 1 }
    ],
    flashcards: [
      { term: 'for loop', definition: 'Init, condition, update, body; repeat.', example: 'for (int i=0; i<5; i++)' },
      { term: 'i++', definition: 'Increment by 1.', example: 'i++' },
      { term: 'Loop variable', definition: 'Variable that changes each iteration.', example: 'int i = 0' },
      { term: 'break', definition: 'Exits the loop immediately.', example: 'if (done) break;' },
      { term: 'continue', definition: 'Skips rest of body, goes to next iteration.', example: 'continue;' }
    ],
    challenges: [{ problem: 'Use for loop to print 0, 1, 2, 3, 4 (each on its own line).', hint: 'for (int i=0; i<5; i++) std::cout << i << "\\n";', expectedOutput: '0\\n1\\n2\\n3\\n4', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-functions',
    title: 'Functions',
    level: 'beginner',
    tutorial: { explanation: 'A function has return type, name, parameters, and body. Use return to send a value back. void means no return.', example: 'int add(int a, int b) { return a + b; }\nstd::cout << add(2, 3);  // 5', kidsExplanation: 'A function is a named recipe. You give it inputs and it gives you an output (or does something).' },
    quiz: [
      { type: 'output', question: 'int f() { return 10; } std::cout << f();', options: ['f()', '10', '0', 'Error'], correct: 1 },
      { type: 'concept', question: 'void means the function returns:', options: ['0', 'nothing', 'void', 'null'], correct: 1 },
      { type: 'completion', question: 'Define function double that takes int n and returns n*2:', options: ['int double(int n) { return n*2; }', 'double(int n) { return n*2; }', 'int double(n) { return n*2; }', 'function double(n) return n*2;'], correct: 0 },
      { type: 'output', question: 'int g(int a, int b) { return a - b; } std::cout << g(10,3);', options: ['7', '10', '3', '-7'], correct: 0 },
      { type: 'concept', question: 'Parameters are declared with:', options: ['Type and name', 'Name only', 'Type only', 'var'], correct: 0 }
    ],
    flashcards: [
      { term: 'Function', definition: 'Named block with parameters and return type.', example: 'int add(int a, int b) { return a+b; }' },
      { term: 'return', definition: 'Sends value back and exits function.', example: 'return 42;' },
      { term: 'void', definition: 'Return type meaning no value.', example: 'void print() { }' },
      { term: 'Parameter', definition: 'Variable in the function signature.', example: 'int add(int a, int b)' },
      { term: 'Argument', definition: 'Value passed when calling.', example: 'add(2, 3)' }
    ],
    challenges: [{ problem: 'Write function square(int n) that returns n*n. Call with 6 and print.', hint: 'int square(int n) { return n*n; }', expectedOutput: '36', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-references',
    title: 'References',
    level: 'intermediate',
    tutorial: { explanation: 'A reference is an alias for another variable. Declare with type& name = var. It must be initialized and cannot be rebound.', example: 'int x = 5;\nint& r = x;\nr = 10;  // x is now 10\nstd::cout << x;  // 10', kidsExplanation: 'A reference is like a second name for the same box. Changing the reference changes the original.' },
    quiz: [
      { type: 'concept', question: 'int& r = x; r is:', options: ['Copy of x', 'Alias (another name) for x', 'Pointer to x', 'New variable'], correct: 1 },
      { type: 'output', question: 'int a=5; int& r=a; r=10; std::cout << a;', options: ['5', '10', 'r', 'Error'], correct: 1 },
      { type: 'completion', question: 'Declare a reference to int named ref bound to variable v:', options: ['int ref = v;', 'int& ref = v;', 'int* ref = v;', 'ref = v;'], correct: 1 },
      { type: 'concept', question: 'Can a reference be rebound to another variable?', options: ['Yes', 'No', 'Only in C++11', 'Only for const'], correct: 1 },
      { type: 'output', question: 'int x=1; int& r=x; r++; std::cout << x;', options: ['1', '2', 'r', 'Error'], correct: 1 }
    ],
    flashcards: [
      { term: 'Reference', definition: 'Alias for an existing variable (type&).', example: 'int& r = x;' },
      { term: 'Alias', definition: 'Another name for the same object.', example: 'int& r = x;' },
      { term: 'Must initialize', definition: 'Reference must be bound at declaration.', example: 'int& r = x;' },
      { term: 'Pass by reference', definition: 'Function parameter type& avoids copy.', example: 'void f(int& x)' },
      { term: 'const reference', definition: 'Cannot modify through the reference.', example: 'const int& r = x;' }
    ],
    challenges: [{ problem: 'Create int n = 5 and a reference ref to n. Change ref to 8 and print n.', hint: 'int& ref = n; ref = 8;', expectedOutput: '8', difficulty: 'intermediate' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-classes',
    title: 'Classes',
    level: 'intermediate',
    tutorial: { explanation: 'A class defines data (member variables) and behavior (member functions). Create objects with ClassName obj; or new. Use . to access members.', example: 'class Dog {\npublic: std::string name;\n  void bark() { std::cout << "Woof"; }\n};\nDog d; d.name = "Max"; d.bark();', kidsExplanation: 'A class is a blueprint. Each object you create from it has its own data and can run the same functions.' },
    quiz: [
      { type: 'concept', question: 'Dog d; creates:', options: ['A class', 'An object', 'A pointer', 'A reference'], correct: 1 },
      { type: 'output', question: 'class C { public: int x; }; C c; c.x = 5; std::cout << c.x;', options: ['0', '5', 'c', 'Error'], correct: 1 },
      { type: 'completion', question: 'Access member name of object obj:', options: ['obj->name', 'obj.name', 'obj[name]', 'obj::name'], correct: 1 },
      { type: 'concept', question: 'public: means:', options: ['Only main can access', 'Any code can access these members', 'Only this class', 'Private'], correct: 1 },
      { type: 'concept', question: 'Member function is:', options: ['Global function', 'Function inside the class', 'Pointer', 'Constructor only'], correct: 1 }
    ],
    flashcards: [
      { term: 'class', definition: 'Blueprint for objects (data + functions).', example: 'class Cat { };' },
      { term: 'Object', definition: 'Instance of a class.', example: 'Cat c;' },
      { term: 'Member', definition: 'Variable or function belonging to the class.', example: 'int x;' },
      { term: 'public', definition: 'Access specifier: accessible from outside.', example: 'public: int x;' },
      { term: 'private', definition: 'Access specifier: only inside the class.', example: 'private: int secret;' }
    ],
    challenges: [{ problem: 'Define class Book with public string title. Create a Book, set title to "C++", print it.', hint: 'class Book { public: std::string title; }; Book b; b.title = "C++";', expectedOutput: 'C++', difficulty: 'intermediate' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-constructors',
    title: 'Constructors',
    level: 'intermediate',
    tutorial: { explanation: 'A constructor has the same name as the class and no return type. It runs when an object is created. Use it to initialize members.', example: 'class Person {\npublic: std::string name;\n  Person(std::string n) { name = n; }\n};\nPerson p("Alice");\nstd::cout << p.name;  // Alice', kidsExplanation: 'The constructor runs when you create a new object. It sets up the object (like giving it a name).' },
    quiz: [
      { type: 'concept', question: 'Constructor name must match:', options: ['main', 'The class name', 'Object', 'init'], correct: 1 },
      { type: 'output', question: 'Person(std::string n){ name=n; } Person p("Bob"); std::cout << p.name;', options: ['Bob', 'n', 'Person', 'Error'], correct: 0 },
      { type: 'completion', question: 'Constructor has no ___ type.', options: ['return', 'void', 'class', 'name'], correct: 0 },
      { type: 'concept', question: 'When does a constructor run?', options: ['When you call it', 'When object is created', 'At program end', 'Never'], correct: 1 },
      { type: 'concept', question: 'Default constructor is one that:', options: ['Does nothing', 'Takes no arguments', 'Returns default', 'Is optional'], correct: 1 }
    ],
    flashcards: [
      { term: 'Constructor', definition: 'Special member function that runs when object is created.', example: 'Person(std::string n) { name = n; }' },
      { term: 'Default constructor', definition: 'Constructor that takes no arguments.', example: 'Person() { }' },
      { term: 'Parameterized constructor', definition: 'Constructor that takes arguments.', example: 'Person(std::string n)' },
      { term: 'Initialization', definition: 'Setting up object state in constructor.', example: 'name = n;' },
      { term: 'Member initializer list', definition: 'Alternative: Person(std::string n) : name(n) { }', example: ': name(n)' }
    ],
    challenges: [{ problem: 'Add constructor to class Car that takes std::string model and sets member model. Create Car("Sedan") and print model.', hint: 'Car(std::string m) { model = m; }', expectedOutput: 'Sedan', difficulty: 'intermediate' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-vector',
    title: 'std::vector',
    level: 'intermediate',
    tutorial: { explanation: 'std::vector is a dynamic array. Include <vector>. Create with vector<Type> v; use push_back(), size(), [i], at(i).', example: '#include <vector>\nstd::vector<int> v;\nv.push_back(1); v.push_back(2);\nstd::cout << v[1];  // 2\nstd::cout << v.size();  // 2', kidsExplanation: 'vector is a growable list. You can add items with push_back and ask how many or get one by position.' },
    quiz: [
      { type: 'output', question: 'std::vector<int> v; v.push_back(10); v.push_back(20); std::cout << v[0];', options: ['0', '10', '20', 'Error'], correct: 1 },
      { type: 'concept', question: 'vector size is obtained with:', options: ['length', 'length()', 'size()', 'size'], correct: 2 },
      { type: 'completion', question: 'Add 5 to vector v:', options: ['v.add(5);', 'v.push_back(5);', 'v.insert(5);', 'v[0]=5;'], correct: 1 },
      { type: 'output', question: 'std::vector<std::string> s; std::cout << s.size();', options: ['null', '0', '1', 'Error'], correct: 1 },
      { type: 'concept', question: 'vector is from:', options: ['iostream', 'vector (std)', 'array', 'list'], correct: 1 }
    ],
    flashcards: [
      { term: 'std::vector', definition: 'Dynamic array from <vector>.', example: 'std::vector<int> v;' },
      { term: 'push_back', definition: 'Adds element to the end.', example: 'v.push_back(5);' },
      { term: 'size()', definition: 'Returns number of elements.', example: 'v.size()' },
      { term: 'v[i]', definition: 'Access element at index i.', example: 'v[0]' },
      { term: 'at(i)', definition: 'Access with bounds check (throws if out of range).', example: 'v.at(0)' }
    ],
    challenges: [{ problem: 'Create std::vector<int>, add 1, 2, 3. Print the second element and the size.', hint: 'v.push_back(1); v.push_back(2); v.push_back(3);', expectedOutput: '2\\n3', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-switch',
    title: 'Switch Statement',
    level: 'beginner',
    tutorial: { explanation: 'switch(expression) { case value: ... break; default: ... }. Expression must be integral or enum. break exits the switch.', example: 'int day = 2;\nswitch (day) {\n  case 1: std::cout << "Mon"; break;\n  case 2: std::cout << "Tue"; break;\n  default: std::cout << "Other";\n}  // Tue', kidsExplanation: 'Switch picks one path based on a number: case 1 do this, case 2 do that, else default.' },
    quiz: [
      { type: 'output', question: 'int x=1; switch(x){ case 1: std::cout<<"A"; break; case 2: std::cout<<"B"; }', options: ['A', 'B', 'AB', 'Error'], correct: 0 },
      { type: 'concept', question: 'break in switch:', options: ['Stops program', 'Exits switch', 'Continues to next case', 'Restarts'], correct: 1 },
      { type: 'completion', question: 'Handle any other value: ___ : code', options: ['else', 'default', 'other', 'case default'], correct: 1 },
      { type: 'concept', question: 'switch expression type in C++:', options: ['Any type', 'Integral or enum', 'Only int', 'Only char'], correct: 1 },
      { type: 'output', question: 'Without break, case 1 and case 2 both have cout; x=1:', options: ['Only case 1 runs', 'Case 1 then case 2 (fall-through)', 'Error', 'Nothing'], correct: 1 }
    ],
    flashcards: [
      { term: 'switch', definition: 'Multi-way branch on a value.', example: 'switch (x) { }' },
      { term: 'case', definition: 'Label for a matching value.', example: 'case 1: ...' },
      { term: 'break', definition: 'Exits switch (prevents fall-through).', example: 'break;' },
      { term: 'default', definition: 'When no case matches.', example: 'default: ...' },
      { term: 'Fall-through', definition: 'When one case runs into the next (no break).', example: 'case 1: case 2: ...' }
    ],
    challenges: [{ problem: 'Use switch: if code is 1 print "One", 2 print "Two", else "Other". Set code=2.', hint: 'switch(code) { case 1: ... case 2: ... default: ... }', expectedOutput: 'Two', difficulty: 'beginner' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-inheritance',
    title: 'Inheritance',
    level: 'advanced',
    tutorial: { explanation: 'A derived class inherits from a base class with class Derived : public Base. It gets base members and can override methods.', example: 'class Animal { public: virtual void speak() { std::cout << "..."; } };\nclass Dog : public Animal { public: void speak() override { std::cout << "Woof"; } };\nDog d; d.speak();  // Woof', kidsExplanation: 'A derived class is a kind of base class. Dog is a kind of Animal, so it can do what Animal does and more.' },
    quiz: [
      { type: 'concept', question: 'Derived class inherits from base with:', options: ['inherits', 'extends', ': public Base', 'from Base'], correct: 2 },
      { type: 'output', question: 'class B : public A { }; B b; Is b an A?', options: ['No', 'Yes', 'Only in main', 'Error'], correct: 1 },
      { type: 'completion', question: 'Override base method in derived: use ___ keyword (C++11).', options: ['override', 'overrides', 'virtual', 'redefine'], correct: 0 },
      { type: 'concept', question: 'virtual in base method allows:', options: ['Faster call', 'Derived to override and polymorphic call', 'Only one override', 'No inheritance'], correct: 1 },
      { type: 'concept', question: 'public in class B : public A means:', options: ['A is public', 'Inheritance is public (base public stays public)', 'B is public', 'A is private'], correct: 1 }
    ],
    flashcards: [
      { term: 'Inheritance', definition: 'Derived class gets base members.', example: 'class Dog : public Animal' },
      { term: 'Base class', definition: 'Parent class that is inherited from.', example: 'Animal' },
      { term: 'Derived class', definition: 'Child class that inherits.', example: 'Dog' },
      { term: 'override', definition: 'Keyword for overriding virtual method (C++11).', example: 'void speak() override' },
      { term: 'virtual', definition: 'Allows method to be overridden and called polymorphically.', example: 'virtual void speak()' }
    ],
    challenges: [{ problem: 'Create class Vehicle with virtual void drive() printing "Driving". Class Car : public Vehicle overrides drive() to print "Car driving". Create Car and call drive().', hint: 'virtual void drive() { ... } in Vehicle; void drive() override { ... } in Car', expectedOutput: 'Car driving', difficulty: 'intermediate' }]
  }));

  addTopic('cpp', T({
    id: 'cpp-string',
    title: 'std::string',
    level: 'intermediate',
    tutorial: { explanation: 'std::string is for text. Include <string>. Use .length(), .size(), [i], .substr(start, len), .find(s), + for concatenation.', example: 'std::string s = "Hello";\nstd::cout << s.length();     // 5\nstd::cout << s.substr(1,3);  // ell\nstd::cout << s + "!";       // Hello!', kidsExplanation: 'std::string is the type for words and sentences. You can get length, one letter, or add strings together.' },
    quiz: [
      { type: 'output', question: '"Hi".length() in std::string? Actually s.length() for std::string s="Hi";', options: ['Hi', '2', '0', 'Error'], correct: 1 },
      { type: 'concept', question: 'Concatenate two strings with:', options: ['concat', '+', 'add', 'join'], correct: 1 },
      { type: 'output', question: 'std::string a="a", b="b"; std::cout << a+b;', options: ['ab', 'a b', 'a+b', 'Error'], correct: 0 },
      { type: 'completion', question: 'Get substring of s from index 1, length 3:', options: ['s.sub(1,3)', 's.substr(1,3)', 's.slice(1,3)', 's.substring(1,3)'], correct: 1 },
      { type: 'concept', question: 's[i] for std::string s gives:', options: ['int', 'char', 'string', 'reference to char'], correct: 3 }
    ],
    flashcards: [
      { term: 'std::string', definition: 'Type for text from <string>.', example: 'std::string s = "hi";' },
      { term: 'length() / size()', definition: 'Number of characters.', example: 's.length()' },
      { term: 'substr(pos, len)', definition: 'Substring starting at pos, length len.', example: 's.substr(1, 2)' },
      { term: 'find(s)', definition: 'Position of first occurrence of s (or npos).', example: 's.find("ll")' },
      { term: 'Concatenation', definition: 's1 + s2 gives a new string.', example: '"Hi" + "!"' }
    ],
    challenges: [{ problem: 'Given std::string s = "C++", print its length, first character (s[0]), and s + " rocks".', hint: 's.length(), s[0], s + " rocks"', expectedOutput: '3\\nC\\nC++ rocks', difficulty: 'beginner' }]
  }));

  // ----- JavaScript -----
  addTopic('javascript', T({
    id: 'js-variables',
    title: 'let and const',
    level: 'beginner',
    tutorial: { explanation: 'Use let for a variable you can reassign; use const for a value that will not change. Both are block-scoped.', example: 'let count = 0;\ncount = 1;  // OK\nconst name = "JS";\n// name = "X";  // Error', kidsExplanation: 'let is like a box you can put something new in. const is a box you seal once—you cannot change what is inside.' },
    quiz: [
      { type: 'output', question: 'let x = 5; x = 10; console.log(x);', options: ['5', '10', 'x', 'Error'], correct: 1 },
      { type: 'concept', question: 'Which cannot be reassigned?', options: ['let', 'const', 'var', 'both let and const'], correct: 1 },
      { type: 'completion', question: 'Declare a constant PI with value 3.14:', options: ['let PI = 3.14;', 'const PI = 3.14;', 'var PI = 3.14;', 'constant PI = 3.14;'], correct: 1 },
      { type: 'output', question: 'const a = 1; a = 2; console.log(a);', options: ['1', '2', 'Error before log', 'undefined'], correct: 2 },
      { type: 'concept', question: 'Block scope means the variable exists only inside:', options: ['The file', 'The function', 'The { } block', 'Globally'], correct: 2 }
    ],
    flashcards: [
      { term: 'let', definition: 'Declares a block-scoped variable that can be reassigned.', example: 'let x = 0;' },
      { term: 'const', definition: 'Declares a block-scoped constant; cannot reassign.', example: 'const PI = 3.14;' },
      { term: 'Block scope', definition: 'Variable visible only inside the { } block.', example: '{ let x = 1; }' },
      { term: 'Reassignment', definition: 'Giving a variable a new value (allowed with let).', example: 'x = 2;' },
      { term: 'Declaration', definition: 'Introducing a variable with let or const.', example: 'let name;' }
    ],
    challenges: [{ problem: 'Declare let score = 0 and const maxScore = 100. Increment score to 50 and print both.', hint: 'score = 50; console.log(score, maxScore);', expectedOutput: '50 100', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-strings',
    title: 'Strings',
    level: 'beginner',
    tutorial: { explanation: 'Strings are text in single or double quotes (or backticks for template literals). Use + to concatenate; .length for length; [i] for character.', example: 'const s = "Hello";\nconsole.log(s.length);   // 5\nconsole.log(s[0]);      // H\nconsole.log(s + "!");   // Hello!', kidsExplanation: 'A string is a piece of text. We can add strings together, get the length, or one letter.' },
    quiz: [
      { type: 'output', question: 'console.log("Hi".length);', options: ['Hi', '2', '0', 'Error'], correct: 1 },
      { type: 'concept', question: 'Template literal uses:', options: ['Single quotes', 'Double quotes', 'Backticks', 'Parentheses'], correct: 2 },
      { type: 'output', question: 'console.log("a" + "b");', options: ['ab', 'a b', 'a+b', 'Error'], correct: 0 },
      { type: 'completion', question: 'Get first character of string s:', options: ['s.first', 's[0]', 's(0)', 's.charAt(0)'], correct: 1 },
      { type: 'output', question: 'const x = "2" + "2"; console.log(x);', options: ['4', '22', '2+2', 'Error'], correct: 1 }
    ],
    flashcards: [
      { term: 'String', definition: 'Text in quotes or backticks.', example: '"hello" or `hi`' },
      { term: 'Template literal', definition: 'Backticks allow ${expr} interpolation.', example: '`Hi ${name}`' },
      { term: 'Concatenation', definition: 'Joining strings with +.', example: '"Hi" + "!"' },
      { term: '.length', definition: 'Property giving number of characters.', example: '"abc".length  // 3' },
      { term: 's[i]', definition: 'Character at index i.', example: '"cat"[0]  // "c"' }
    ],
    challenges: [{ problem: 'Create const first = "Java" and const last = "Script". Print first + last with a space between.', hint: 'first + " " + last', expectedOutput: 'Java Script', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-arrays',
    title: 'Arrays',
    level: 'beginner',
    tutorial: { explanation: 'An array holds ordered values. Create with [] or new Array(). Use .length, [i], .push(), .pop(), .shift(), .unshift().', example: 'const arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);  // 4\nconsole.log(arr[1]);      // 2', kidsExplanation: 'An array is a list. You can add things at the end with push, get one by number [0], [1], and ask how many with .length.' },
    quiz: [
      { type: 'output', question: 'const a = [10, 20, 30]; console.log(a[1]);', options: ['10', '20', '30', 'Error'], correct: 1 },
      { type: 'concept', question: 'Add element to end of array:', options: ['.add()', '.push()', '.append()', '.insert()'], correct: 1 },
      { type: 'output', question: 'const x = [1, 2]; x.push(3); console.log(x.length);', options: ['2', '3', '1', 'Error'], correct: 1 },
      { type: 'completion', question: 'Create an empty array:', options: ['[]', 'new Array()', 'array()', 'Both A and B'], correct: 3 },
      { type: 'output', question: '[1, 2, 3].pop() returns:', options: ['1', '2', '3', '[1,2]'], correct: 2 }
    ],
    flashcards: [
      { term: 'Array', definition: 'Ordered list of values in [].', example: '[1, 2, 3]' },
      { term: 'push()', definition: 'Adds element to the end.', example: 'arr.push(4);' },
      { term: 'pop()', definition: 'Removes and returns last element.', example: 'arr.pop()' },
      { term: 'length', definition: 'Property with number of elements.', example: 'arr.length' },
      { term: 'Index', definition: 'Position from 0 to length-1.', example: 'arr[0]' }
    ],
    challenges: [{ problem: 'Create array [5, 10, 15]. Push 20. Print the array and its length.', hint: 'arr.push(20); console.log(arr, arr.length);', expectedOutput: '[ 5, 10, 15, 20 ] 4', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-objects',
    title: 'Objects',
    level: 'beginner',
    tutorial: { explanation: 'An object holds key-value pairs. Create with {} or { key: value }. Access with obj.key or obj["key"]. Add/change with assignment.', example: 'const user = { name: "Alex", age: 20 };\nconsole.log(user.name);   // Alex\nuser.score = 100;', kidsExplanation: 'An object is like a labeled box: each label (key) has one value. You can read and change values by name.' },
    quiz: [
      { type: 'output', question: 'const o = {a:1, b:2}; console.log(o.a);', options: ['a', '1', '2', 'Error'], correct: 1 },
      { type: 'concept', question: 'Access property with variable key name:', options: ['obj.key', 'obj[key]', 'obj.key()', 'obj(key)'], correct: 1 },
      { type: 'output', question: 'const p = {}; p.x = 10; console.log(p.x);', options: ['{}', '10', 'undefined', 'Error'], correct: 1 },
      { type: 'completion', question: 'Create object with name "Jo" and age 25:', options: ['{ name: "Jo", age: 25 }', 'object(name, age)', 'new Object("Jo", 25)', 'Object.create(...)'], correct: 0 },
      { type: 'concept', question: 'Object keys are often:', options: ['Numbers only', 'Strings (or symbols)', 'Arrays', 'Functions only'], correct: 1 }
    ],
    flashcards: [
      { term: 'Object', definition: 'Collection of key-value pairs.', example: '{ name: "Alex", age: 20 }' },
      { term: 'Property', definition: 'Key-value pair in an object.', example: 'name: "Alex"' },
      { term: 'Dot notation', definition: 'obj.key to access property.', example: 'user.name' },
      { term: 'Bracket notation', definition: 'obj["key"] for dynamic or special keys.', example: 'obj[key]' },
      { term: 'Literal', definition: 'Creating object with { key: value }.', example: '{ x: 1 }' }
    ],
    challenges: [{ problem: 'Create object book with title "JS Guide" and pages 100. Print title and pages.', hint: 'const book = { title: "JS Guide", pages: 100 };', expectedOutput: 'JS Guide 100', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-if-else',
    title: 'If and Else',
    level: 'beginner',
    tutorial: { explanation: 'Use if (condition) { } for one branch; else { } for the other. Conditions use ===, !==, <, >, <=, >=. Prefer === over ==.', example: 'const age = 14;\nif (age >= 18) console.log("Adult");\nelse if (age >= 13) console.log("Teen");\nelse console.log("Child");  // Teen', kidsExplanation: 'If/else lets the computer choose: "If this is true, do this; else do that."' },
    quiz: [
      { type: 'output', question: 'const x = 5; if (x > 3) console.log("yes"); else console.log("no");', options: ['yes', 'no', 'yes no', 'Error'], correct: 0 },
      { type: 'concept', question: 'Strict equality in JavaScript:', options: ['=', '==', '===', 'eq'], correct: 2 },
      { type: 'completion', question: 'Test a is not equal to b (value and type):', options: ['a != b', 'a !== b', 'a not b', '!a == b'], correct: 1 },
      { type: 'output', question: 'if (0) console.log("A"); else console.log("B");', options: ['A', 'B', 'A B', 'Nothing'], correct: 1 },
      { type: 'concept', question: 'Falsy values include:', options: ['Only false', 'false, 0, "", null, undefined, NaN', 'All numbers', 'Only null'], correct: 1 }
    ],
    flashcards: [
      { term: 'if', definition: 'Runs block when condition is truthy.', example: 'if (x > 0) { }' },
      { term: 'else', definition: 'Runs when if (and else if) conditions are falsy.', example: 'else { }' },
      { term: '===', definition: 'Strict equality (value and type).', example: 'x === 5' },
      { term: '!==', definition: 'Strict inequality.', example: 'x !== 0' },
      { term: 'Truthy / Falsy', definition: 'Values that act like true/false in conditions.', example: '0 is falsy, 1 is truthy' }
    ],
    challenges: [{ problem: 'Set const temp = 25. If temp > 30 print "Hot", else if temp > 20 print "Warm", else "Cool".', hint: 'if (temp > 30) ... else if (temp > 20) ...', expectedOutput: 'Warm', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-for-loop',
    title: 'For Loops',
    level: 'beginner',
    tutorial: { explanation: 'for (init; condition; update) { body } or for (const item of array) to loop over values. Classic: for (let i = 0; i < n; i++).', example: 'for (let i = 0; i < 3; i++) console.log(i);  // 0, 1, 2\nfor (const x of [1,2,3]) console.log(x);  // 1, 2, 3', kidsExplanation: 'A for loop repeats: start at 0, do something, add 1, and keep going until the condition is false.' },
    quiz: [
      { type: 'output', question: 'for (let i = 0; i < 2; i++) console.log(i);', options: ['0', '0 1', '0\\n1', '2'], correct: 2 },
      { type: 'concept', question: 'for (const x of arr) iterates over:', options: ['Indices', 'Values', 'Keys', 'Length'], correct: 1 },
      { type: 'completion', question: 'Loop from 0 to 4: for (let i = 0; i < ___; i++)', options: ['4', '5', '<= 4', 'i < 5'], correct: 1 },
      { type: 'output', question: 'let s = 0; for (let i = 1; i <= 3; i++) s += i; console.log(s);', options: ['3', '6', '1', '0'], correct: 1 },
      { type: 'concept', question: 'let i in for loop gives:', options: ['Global scope', 'Block scope', 'Function scope', 'No scope'], correct: 1 }
    ],
    flashcards: [
      { term: 'for loop', definition: 'Init, condition, update, body; repeat.', example: 'for (let i = 0; i < 5; i++)' },
      { term: 'for...of', definition: 'Loop over values of an iterable.', example: 'for (const x of arr)' },
      { term: 'for...in', definition: 'Loop over keys (indices or property names).', example: 'for (const k in obj)' },
      { term: 'Loop variable', definition: 'Variable that changes each iteration.', example: 'let i = 0' },
      { term: 'i++', definition: 'Increment i by 1.', example: 'i++' }
    ],
    challenges: [{ problem: 'Use for loop to print 0, 1, 2, 3, 4 (each on its own line).', hint: 'for (let i = 0; i < 5; i++) console.log(i);', expectedOutput: '0\\n1\\n2\\n3\\n4', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-functions',
    title: 'Functions',
    level: 'beginner',
    tutorial: { explanation: 'Define with function name() { } or const name = function() { } or const name = () => { }. Call with name(). Use return to send a value back.', example: 'function add(a, b) { return a + b; }\nconsole.log(add(2, 3));  // 5', kidsExplanation: 'A function is a reusable recipe. You give it inputs (parameters) and it can give you an output (return).' },
    quiz: [
      { type: 'output', question: 'function f() { return 10; } console.log(f());', options: ['f()', '10', 'undefined', 'Error'], correct: 1 },
      { type: 'concept', question: 'Arrow function uses:', options: ['function keyword', '=>', '->', 'arrow keyword'], correct: 1 },
      { type: 'completion', question: 'Arrow function that returns x * 2:', options: ['x => x * 2', 'function(x) { return x*2; }', 'arrow x return x*2', 'Both A and B'], correct: 3 },
      { type: 'output', question: 'function g(a,b) { return a - b; } console.log(g(10, 3));', options: ['7', '10', '3', '-7'], correct: 0 },
      { type: 'concept', question: 'return does what?', options: ['Prints the value', 'Sends value back and exits function', 'Restarts function', 'Only in main'], correct: 1 }
    ],
    flashcards: [
      { term: 'Function', definition: 'Reusable block that can take parameters and return a value.', example: 'function add(a, b) { return a + b; }' },
      { term: 'Arrow function', definition: 'Shorthand: (params) => expression or { }.', example: 'const add = (a, b) => a + b;' },
      { term: 'return', definition: 'Sends value back and exits the function.', example: 'return 42;' },
      { term: 'Parameter', definition: 'Variable in the function definition.', example: 'function f(x) { }' },
      { term: 'Argument', definition: 'Value passed when calling.', example: 'f(5)' }
    ],
    challenges: [{ problem: 'Write function double(n) that returns n * 2. Call with 7 and print the result.', hint: 'function double(n) { return n * 2; }', expectedOutput: '14', difficulty: 'beginner' }]
  }));

  addTopic('javascript', T({
    id: 'js-callbacks',
    title: 'Callbacks',
    level: 'intermediate',
    tutorial: { explanation: 'A callback is a function passed as an argument. Another function can call it later (e.g. when an event happens or after async work).', example: 'function doTwice(fn) { fn(); fn(); }\ndoTwice(() => console.log("Hi"));  // Hi Hi', kidsExplanation: 'A callback is like leaving a note: "When you finish, call this function." The computer runs your function when the time comes.' },
    quiz: [
      { type: 'output', question: 'function run(f) { f(); } run(() => console.log("OK"));', options: ['f', 'OK', 'run', 'Error'], correct: 1 },
      { type: 'concept', question: 'Callback is:', options: ['A return value', 'A function passed to be called later', 'A variable', 'A loop'], correct: 1 },
      { type: 'completion', question: 'Pass a function to setTimeout to run after 1 second:', options: ['setTimeout(1000, fn)', 'setTimeout(fn, 1000)', 'setTimeout(1, fn)', 'wait(1000, fn)'], correct: 1 },
      { type: 'output', question: 'const cb = () => 5; console.log(cb());', options: ['cb', '5', 'undefined', 'Error'], correct: 1 },
      { type: 'concept', question: 'Array methods that take callbacks include:', options: ['Only map', 'map, filter, forEach, reduce', 'Only forEach', 'None'], correct: 1 }
    ],
    flashcards: [
      { term: 'Callback', definition: 'Function passed as argument to be called later.', example: 'setTimeout(() => console.log("done"), 1000)' },
      { term: 'Higher-order function', definition: 'Function that takes or returns a function.', example: 'function twice(f) { f(); f(); }' },
      { term: 'forEach', definition: 'Calls callback for each element.', example: 'arr.forEach(x => console.log(x))' },
      { term: 'map', definition: 'Returns new array of callback return values.', example: 'arr.map(x => x * 2)' },
      { term: 'filter', definition: 'Returns new array of elements that pass callback test.', example: 'arr.filter(x => x > 0)' }
    ],
    challenges: [{ problem: 'Write function repeat(n, fn) that calls fn n times. Call repeat(3, () => console.log("Hi")).', hint: 'for (let i = 0; i < n; i++) fn();', expectedOutput: 'Hi\\nHi\\nHi', difficulty: 'intermediate' }]
  }));

  addTopic('javascript', T({
    id: 'js-dom-basics',
    title: 'DOM Basics',
    level: 'intermediate',
    tutorial: { explanation: 'The DOM is the tree of HTML elements. document.getElementById(id), querySelector(selector), querySelectorAll. Change text with .textContent, add/remove with .appendChild, .remove.', example: 'const el = document.getElementById("myId");\nel.textContent = "Hello";\nel.classList.add("active");', kidsExplanation: 'The DOM is like a tree of all the parts of the page. JavaScript can find a part (element) and change its text or style.' },
    quiz: [
      { type: 'concept', question: 'DOM stands for:', options: ['Data Object Model', 'Document Object Model', 'Document Order Model', 'Display Object Model'], correct: 1 },
      { type: 'concept', question: 'Get element by id "btn":', options: ['document.getElement("btn")', 'document.getElementById("btn")', 'document.querySelector("#btn")', 'Both B and C'], correct: 3 },
      { type: 'completion', question: 'Set the text inside element el to "Hi":', options: ['el.text = "Hi"', 'el.textContent = "Hi"', 'el.innerHTML = "Hi"', 'Both B and C'], correct: 3 },
      { type: 'concept', question: 'querySelector returns:', options: ['All matching elements', 'First matching element', 'Array', 'NodeList'], correct: 1 },
      { type: 'concept', question: 'Add a CSS class to element el:', options: ['el.class = "x"', 'el.classList.add("x")', 'el.addClass("x")', 'el.className.add("x")'], correct: 1 }
    ],
    flashcards: [
      { term: 'DOM', definition: 'Document Object Model; tree of HTML elements.', example: 'document.body' },
      { term: 'getElementById', definition: 'Returns element with given id.', example: 'document.getElementById("app")' },
      { term: 'querySelector', definition: 'Returns first element matching CSS selector.', example: 'document.querySelector(".btn")' },
      { term: 'textContent', definition: 'Property for plain text content of element.', example: 'el.textContent = "Hi"' },
      { term: 'classList', definition: 'Object to add/remove/toggle CSS classes.', example: 'el.classList.add("active")' }
    ],
    challenges: [{ problem: 'Assume there is an element with id "output". In JS, get it and set its textContent to "Hello, DOM!".', hint: 'document.getElementById("output").textContent = "Hello, DOM!";', expectedOutput: 'Hello, DOM!', difficulty: 'intermediate' }]
  }));

  addTopic('javascript', T({
    id: 'js-json',
    title: 'JSON',
    level: 'intermediate',
    tutorial: { explanation: 'JSON is a text format for data (objects and arrays). JSON.stringify(obj) converts object to string; JSON.parse(str) converts string to object.', example: 'const obj = { a: 1, b: 2 };\nconst str = JSON.stringify(obj);  // \'{"a":1,"b":2}\'\nconst back = JSON.parse(str);  // { a: 1, b: 2 }', kidsExplanation: 'JSON is like writing an object or list as text so we can save it or send it. We can turn it back into an object with parse.' },
    quiz: [
      { type: 'output', question: 'console.log(JSON.stringify({x:1}));', options: ['{x:1}', '\'{"x":1}\'', '[object Object]', 'Error'], correct: 1 },
      { type: 'concept', question: 'Parse a JSON string to object:', options: ['JSON.parse(str)', 'JSON.parseObject(str)', 'parse(str)', 'str.parse()'], correct: 0 },
      { type: 'output', question: 'console.log(JSON.parse(\'{"a":2}\').a);', options: ['{"a":2}', '2', 'a', 'Error'], correct: 1 },
      { type: 'completion', question: 'Convert object obj to JSON string:', options: ['JSON.stringify(obj)', 'obj.stringify()', 'JSON.to string(obj)', 'stringify(obj)'], correct: 0 },
      { type: 'concept', question: 'JSON keys must be:', options: ['Numbers', 'In double quotes', 'Unquoted', 'Single-quoted'], correct: 1 }
    ],
    flashcards: [
      { term: 'JSON', definition: 'JavaScript Object Notation; text format for data.', example: '{"name": "Alex"}' },
      { term: 'JSON.stringify', definition: 'Converts object to JSON string.', example: 'JSON.stringify(obj)' },
      { term: 'JSON.parse', definition: 'Converts JSON string to object.', example: 'JSON.parse(str)' },
      { term: 'Serialization', definition: 'Turning data into a storable/transmittable form.', example: 'JSON.stringify' },
      { term: 'Parse', definition: 'Turning string (e.g. JSON) back into data.', example: 'JSON.parse' }
    ],
    challenges: [{ problem: 'Create object { name: "Dev", level: 5 }. Convert to JSON string and log it. Then parse it back and log the name.', hint: 'JSON.stringify and JSON.parse', expectedOutput: '{"name":"Dev","level":5}\\nDev', difficulty: 'intermediate' }]
  }));

  addTopic('javascript', T({
    id: 'js-modules',
    title: 'Modules (import/export)',
    level: 'advanced',
    tutorial: { explanation: 'ES modules: export to expose names from a file; import to use them in another. export default for one main export; named exports with export { name }.', example: '// math.js: export function add(a,b) { return a+b; }\n// main.js: import { add } from "./math.js";\nconsole.log(add(2,3));  // 5', kidsExplanation: 'Modules let you split code into files. One file can "export" things and another file can "import" them to use.' },
    quiz: [
      { type: 'concept', question: 'Export a function so another file can use it:', options: ['export function f() {}', 'function export f() {}', 'export(f)', 'public function f() {}'], correct: 0 },
      { type: 'concept', question: 'Import named export add from "./math.js":', options: ['import add from "./math.js"', 'import { add } from "./math.js"', 'require("./math.js").add', 'load add from "./math.js"'], correct: 1 },
      { type: 'completion', question: 'Default export: export ___ myFunc;', options: ['default', 'default function', 'export default', 'default export'], correct: 0 },
      { type: 'concept', question: 'import x from "./f.js" imports:', options: ['Named export x', 'Default export', 'Everything from f.js', 'Only variable x'], correct: 1 },
      { type: 'concept', question: 'Script type for ES modules in HTML:', options: ['script', 'script type="module"', 'script module', 'script es6'], correct: 1 }
    ],
    flashcards: [
      { term: 'export', definition: 'Exposes a name for other modules to import.', example: 'export function add() {}' },
      { term: 'import', definition: 'Brings in names from another module.', example: 'import { add } from "./math.js"' },
      { term: 'Default export', definition: 'Single main export: export default fn;', example: 'export default myFunc;' },
      { term: 'Named export', definition: 'Multiple exports with names: export { a, b };', example: 'export { add, sub };' },
      { term: 'Module', definition: 'File that uses import/export.', example: 'type="module" in script tag' }
    ],
    challenges: [{ problem: 'In file utils.js export a function greet() that returns "Hello". In main.js import greet and console.log(greet()).', hint: 'export function greet() { return "Hello"; } and import { greet } from "./utils.js";', expectedOutput: 'Hello', difficulty: 'advanced' }]
  }));

  addTopic('javascript', T({
    id: 'js-async-basics',
    title: 'Async Basics (Promises)',
    level: 'advanced',
    tutorial: { explanation: 'Promises represent a value that may be available later. .then(callback) runs when the promise resolves; .catch() for errors. async/await: await promise pauses until resolved.', example: 'fetch("/api").then(r => r.json()).then(data => console.log(data));\nasync function get() { const r = await fetch("/api"); return r.json(); }', kidsExplanation: 'A promise is like a receipt: "Your result will be ready later." You can say "when it is ready, do this" with .then or await.' },
    quiz: [
      { type: 'concept', question: 'A Promise can be:', options: ['Only resolved', 'Pending, resolved, or rejected', 'Only rejected', 'Synchronous'], correct: 1 },
      { type: 'concept', question: 'Run code when promise succeeds:', options: ['.then(cb)', '.catch(cb)', '.finally(cb)', '.done(cb)'], correct: 0 },
      { type: 'completion', question: 'Use await inside a function that is declared with ___', options: ['async', 'await', 'promise', 'then'], correct: 0 },
      { type: 'output', question: 'Promise.resolve(5).then(v => console.log(v));', options: ['5', 'Promise', 'undefined', 'Error'], correct: 0 },
      { type: 'concept', question: 'async function always returns:', options: ['The value you return', 'A Promise', 'undefined', 'Both A and B (wrapped in Promise)'], correct: 3 }
    ],
    flashcards: [
      { term: 'Promise', definition: 'Object representing eventual completion or failure.', example: 'fetch(url)' },
      { term: 'then', definition: 'Registers callback when promise resolves.', example: 'p.then(v => console.log(v))' },
      { term: 'catch', definition: 'Handles promise rejection.', example: 'p.catch(err => ...)' },
      { term: 'async', definition: 'Keyword for function that returns a Promise.', example: 'async function f() {}' },
      { term: 'await', definition: 'Pauses until Promise resolves (inside async).', example: 'const x = await fetch(...)' }
    ],
    challenges: [{ problem: 'Create a promise that resolves to 42. Use .then to log the value.', hint: 'Promise.resolve(42).then(v => console.log(v));', expectedOutput: '42', difficulty: 'intermediate' }]
  }));

})();

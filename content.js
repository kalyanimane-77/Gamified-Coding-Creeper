/* Gamified Coding Creeper — Learning content (data + helpers) */
window.LC_CONTENT = {
  languages: [
    { id: 'python', name: 'Python', description: 'Clear, readable syntax. Great for beginners.' },
    { id: 'java', name: 'Java', description: 'Object-oriented, portable, used everywhere.' },
    { id: 'cpp', name: 'C++', description: 'Fast, powerful. Games and systems.' },
    { id: 'javascript', name: 'JavaScript', description: 'The language of the web.' }
  ],
  levels: ['beginner', 'intermediate', 'advanced'],
  topics: {}
};

function addTopic(langId, topic) {
  if (!window.LC_CONTENT.topics[langId]) window.LC_CONTENT.topics[langId] = [];
  window.LC_CONTENT.topics[langId].push(topic);
}

function getTopics(langId) {
  return (window.LC_CONTENT.topics[langId] || []).slice();
}

function getTopic(langId, topicId) {
  var list = window.LC_CONTENT.topics[langId] || [];
  for (var i = 0; i < list.length; i++) if (list[i].id === topicId) return list[i];
  return null;
}

function getTopicByIndex(langId, index) {
  var list = window.LC_CONTENT.topics[langId] || [];
  return list[index] || null;
}

function getTopicsByLevel(langId, level) {
  var list = window.LC_CONTENT.topics[langId] || [];
  var out = [];
  for (var i = 0; i < list.length; i++) {
    if ((list[i].level || 'beginner') === level) out.push({ topic: list[i], index: i });
  }
  return out;
}

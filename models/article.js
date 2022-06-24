const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// to create HTML and purify it by using JSDOM window object
const dompurify = createDomPurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

articleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  if (this.markdown) {
    // to convert our markeddown to HTML and purify that HTML to get rid of any mallicious code
    this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
  }

  next();
});

module.exports = mongoose.model('Article', articleSchema);

const mongoose = require("mongoose");
const marked = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const articlesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitiziedHtml: {
    type: String,
    required: true,
  },
});

articlesSchema.pre("validate", function () {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitiziedHtml = dompurify.sanitize(marked(this.markdown));
  }
});

module.exports = mongoose.model("Article", articlesSchema);

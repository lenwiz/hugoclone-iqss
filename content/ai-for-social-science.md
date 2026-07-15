---
title: "AI for Social Science"
date: 2026-07-14
draft: false
layout: "ai-social-science"
subtitle: "Practical tools, methods, and use cases for integrating artificial intelligence into social science research."
---

## Why AI for Social Science?

Artificial intelligence is reshaping what is possible in social science research. Tasks that once required years of manual coding — classifying thousands of survey responses, reading millions of news articles, transcribing oral histories — can now be completed in hours. More importantly, AI opens entirely new research designs: detecting patterns across text corpora too large for any team, generating synthetic survey populations for power analysis, or applying computer vision to historical photographs and satellite imagery.

This page is a practical guide to the tools, methods, and active use cases most relevant to IQSS researchers. It is organized by research task so you can find the right approach for your problem.

---

## Large Language Models (LLMs) in Research

Large language models like Claude, GPT-4, and Llama are the most versatile AI tools now available to researchers.

### What Researchers Are Doing with LLMs

**Text classification and coding** — LLMs can apply researcher-defined coding schemes to open-ended responses, legislative transcripts, social media posts, or news archives. In many studies, GPT-4 and Claude match or exceed inter-rater reliability between human coders, at a fraction of the cost and time. See: [Argyle et al. 2023, "Out of One, Many"](https://doi.org/10.1017/pan.2023.2); Gilardi et al. 2023.

**Synthetic respondents and survey simulation** — LLMs conditioned on demographic profiles can simulate survey responses, enabling pre-study power analysis, testing question wording, or studying populations that are hard to sample. *Use with caution*: synthetic respondents replicate training-data biases and cannot substitute for real human data in causal claims.

**Interview and focus group analysis** — Qualitative data from hundreds of interviews can be thematically coded, summarized by subgroup, and queried interactively using retrieval-augmented generation (RAG).

**Literature review acceleration** — Tools like Elicit, ResearchRabbit, and Semantic Scholar's API use LLMs to screen abstracts, extract effect sizes, and map citation networks, compressing systematic review timelines substantially.

**Hypothesis generation** — Researchers use LLMs to brainstorm mechanisms, identify overlooked moderators, and stress-test theoretical arguments before data collection.

### Recommended Tools

<div class="card-grid">
<div class="card">
<h3>Claude (Anthropic)</h3>
<p>Strong at nuanced instruction-following, long documents (up to 200K tokens), and structured output. Well-suited for qualitative coding tasks with complex schemas.</p>
</div>
<div class="card">
<h3>GPT-4 / GPT-4o (OpenAI)</h3>
<p>Broad capability, multimodal (text + images), extensive Python API ecosystem. Most benchmarked model in published social science studies to date.</p>
</div>
<div class="card">
<h3>Llama 3 (Meta, open)</h3>
<p>Open-weights model you can run locally or on Harvard research computing clusters. No data leaves your environment — critical for sensitive survey data or IRB-restricted datasets.</p>
</div>
<div class="card">
<h3>Gemini 1.5 Pro (Google)</h3>
<p>Extremely long context window (1M tokens). Useful for processing entire books, legislative sessions, or longitudinal document collections in a single call.</p>
</div>
</div>

### Practical Guidance: Prompt Engineering for Coding Tasks

The quality of LLM output for classification tasks depends heavily on prompt design:

1. **Provide a codebook, not just a label.** Include definitions, examples of each category, and edge-case rules — exactly as you would brief a research assistant.
2. **Request structured output.** Ask for JSON with fields for the label, a confidence score, and a one-sentence rationale. This enables auditing and filtering low-confidence cases.
3. **Run a validation set first.** Apply the model to 100–200 items you have hand-coded. Calculate Cohen's κ before scaling up.
4. **Use temperature = 0** for classification tasks to get deterministic, reproducible results.
5. **Document your prompt as a methods artifact.** The prompt is the measurement instrument; it belongs in supplementary materials.

---

## Natural Language Processing (NLP)

NLP methods, many now powered by transformer-based models, remain the workhorse of computational social science.

### Core Methods

**Sentiment analysis** — Classify text as positive, negative, or neutral. Modern models (RoBERTa, VADER for social media, FinBERT for financial text) far outperform dictionary-based approaches on domain-specific corpora.

**Topic modeling** — BERTopic and Top2Vec use sentence embeddings to discover coherent topics without hand-tuning the number of topics, overcoming a key limitation of LDA. Useful for press coverage, legislative speech, or social media corpora.

**Named entity recognition (NER)** — Automatically tag people, organizations, locations, and dates in text. Enables large-scale network construction from news archives or corporate filings.

**Stance and framing detection** — Beyond sentiment, models can classify whether a text *supports or opposes* a proposition, or detect rhetorical frames (e.g., economic vs. moral framing of immigration).

**Text-as-data scaling** — Wordfish, Wordscores, and supervised scaling models place political actors on a latent ideological dimension using their speech. Now extended with transformer embeddings.

### Key Python Libraries

```python
# Sentiment / classification
from transformers import pipeline
classifier = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")

# Topic modeling
from bertopic import BERTopic
model = BERTopic(language="english")
topics, probs = model.fit_transform(docs)

# NER
import spacy
nlp = spacy.load("en_core_web_trf")
doc = nlp("The World Bank announced a new initiative in Geneva.")
```

### Key R Packages

- **quanteda** — Fast, flexible text analysis framework for R; excellent for large corpora
- **tidytext** — Tidy-principles text mining; integrates cleanly with dplyr/ggplot2
- **stm** — Structural Topic Model; incorporates document-level metadata as covariates
- **text** — Bridges R and transformer models via Python's `transformers` library

---

## Computer Vision

Computer vision allows researchers to extract information from images and video at scale — a frontier that was simply inaccessible before deep learning.

### Use Cases in Social Science

**Satellite imagery analysis** — Estimate economic activity, poverty, conflict damage, or deforestation from publicly available satellite images (Sentinel-2, Landsat, Planet Labs). Jean et al. (2016) predicted poverty from nighttime lights; subsequent work uses daytime imagery with CNNs to predict household wealth at village level.

**Historical photograph analysis** — Classify occupational dress, racial presentation, crowd demographics, or protest imagery across digitized archives.

**Social media image coding** — Classify political ads, protest signs, or health behavior imagery on Instagram/Twitter at scale. Critical for computational framing studies.

**Street-level imagery** — Google Street View images have been used to study neighborhood change, physical disorder, green space, and political attitudes (e.g., Gebru et al. 2017 predicted voting patterns from car types).

**Facial analysis** — Estimate age, emotion, or attention in experimental settings. *High bias risk*: commercial facial analysis systems perform significantly worse on darker-skinned faces (Buolamwini & Gebru 2018). Always audit your model on your specific population.

### Recommended Tools

- **Roboflow** — No-code platform for building custom image classifiers; good for labeling and training on small research-specific categories
- **Google Vision API / AWS Rekognition** — Hosted APIs for object detection, OCR, and face analysis; fast to prototype, but data leaves your environment
- **PyTorch + HuggingFace** — Full control; use pretrained ResNet, ViT, or CLIP models fine-tuned on your labeled dataset
- **CLIP (OpenAI)** — Zero-shot image classification using text descriptions; useful when you cannot collect labeled training data

---

## Causal Inference with Machine Learning

The combination of causal inference frameworks and ML predictive power — sometimes called "causal ML" — is one of the most active methodological frontiers in social science.

### Methods

**Double/Debiased Machine Learning (DML)** — Uses ML to flexibly control for high-dimensional confounders while estimating a causal effect. The `DoubleML` package in Python and R implements this for a range of estimands.

**Causal Forests (Generalized Random Forests)** — Estimates heterogeneous treatment effects: not just the average effect of a policy, but *for whom* the effect is larger or smaller. Implemented in the `grf` R package (Athey, Tibshirani, Wager 2019).

**BART (Bayesian Additive Regression Trees)** — Non-parametric Bayesian model widely used for estimating treatment effects in observational studies. `BART` and `bartCause` packages in R.

**Synthetic Control with ML** — The `augsynth` package extends synthetic control methods with ML outcome models, reducing bias when pre-treatment fit is imperfect.

**Difference-in-Differences with Staggered Adoption** — New estimators (Callaway & Sant'Anna, Sun & Abraham, Roth et al.) correct the "bad comparisons" problem in two-way fixed effects models when treatment timing varies. Packages: `did`, `staggered` in R.

### Key Resources

- **Athey & Imbens (2019)** — "Machine Learning Methods That Economists Should Know About" — *Annual Review of Economics*
- **Cunningham (2021)** — *Causal Inference: The Mixtape* (free online) — includes ML chapters
- **The Effect (Huntington-Klein)** — Free textbook with R and Python code
- **EconML (Microsoft)** — Python library for causal ML, including DML, causal forests, and instrumental variable forests

---

## Survey Research and Measurement

**Automated open-end coding** — Apply LLMs or fine-tuned classifiers to open-ended survey responses. The [openai-cookbook](https://github.com/openai/openai-cookbook) has survey coding examples; IQSS Data Science Services can advise on validation approaches.

**Adaptive survey design** — ML models can predict survey breakoff, recommend follow-up questions based on prior responses, or flag likely satisficers in real time during data collection.

**Record linkage and deduplication** — Models like `dedupe` (Python) or `fastLink` (R) use probabilistic matching to link survey respondents to administrative records or across waves without shared unique identifiers.

**Embedding-based question similarity** — Sentence transformers can identify conceptually equivalent survey items across different instruments, enabling cross-study comparisons without identical wording.

---

## Network Analysis at Scale

**Community detection** — Algorithms like the Louvain method and HDBSCAN applied to large social networks (Twitter/X follower graphs, co-authorship networks, legislative cosponsorship) can identify clusters without specifying the number of communities in advance.

**Temporal network analysis** — Track how communities form, merge, and dissolve over time. The `networkx` (Python) and `igraph` (R/Python) libraries support dynamic network objects.

**Text-network integration** — Combine NLP-derived ties (who cites whom, who is mentioned together) with relational data to build richer network structures. The `text2map` R package bridges text and network methods.

---

## Research Ethics and Responsible AI Use

Using AI in social science research raises methodological and ethical obligations:

### Data Privacy
- **Never upload restricted or IRB-protected data to commercial AI APIs** (OpenAI, Anthropic, Google) without verifying the vendor's data handling terms and obtaining appropriate approval. Use local open-weight models (Llama, Mistral) for sensitive data.
- De-identify before processing. Even "anonymized" free text can re-identify respondents when passed to external systems.

### Bias and Validity
- **Audit for differential performance** across subgroups before relying on AI labels for any analysis involving race, gender, national origin, or other protected characteristics.
- LLMs encode the biases present in their training data. Classifications of politically or culturally sensitive content should always include human validation.
- Report inter-rater reliability (Cohen's κ or Krippendorff's α) between AI labels and human ground truth in your methods section.

### Transparency and Reproducibility
- Report the model name, version, and exact prompt used for any AI-generated labels or classifications. These are methodological choices that affect replication.
- API models are updated silently; freeze your model version (e.g., `gpt-4o-2024-08-06`) to ensure reproducibility.
- Publish your prompts and validation codebooks as supplementary materials.

### IRB Considerations
- Using LLMs to analyze human-generated text generally does not require new IRB approval if the original data collection was approved and the AI is performing the same analytic task as a human coder.
- Generating synthetic respondent data and publishing it as if it were real survey data raises ethical concerns — consult your IRB.
- Automated systems that directly affect research subjects (e.g., adaptive interventions, content moderation) typically require explicit IRB review.

---

## Getting Started at IQSS

<div class="info-box">
<p><strong>Data Science Services (DSS)</strong> at IQSS offers individual consultations on research design, statistical methods, and computational approaches including AI/ML. Drop-in hours and appointment scheduling are available through the <a href="/research-resources/">Research Resources</a> page.</p>
</div>

### Recommended Learning Path

**If you are new to AI/ML in research:**
1. Complete fast.ai's free *Practical Deep Learning for Coders* course
2. Read *Bit by Bit: Social Research in the Digital Age* (Salganik, free online)
3. Attend IQSS workshops on text analysis and computational methods

**If you have programming experience:**
1. Work through the HuggingFace NLP course (free, Python-based)
2. Explore the `tidymodels` (R) or `scikit-learn` (Python) documentation
3. Experiment with the Anthropic or OpenAI API on a pilot dataset

**If you are ready to scale:**
1. Request access to Harvard Research Computing (FASRC) for GPU-enabled jobs
2. Explore Harvard's agreements with cloud AI platforms through University IT
3. Contact DSS for a consultation on your specific research design

### Key Readings

- Grimmer, Roberts & Stewart (2022) — *Text as Data: A New Framework for Machine Learning and the Social Sciences* — Princeton University Press
- Salganik (2018) — *Bit by Bit: Social Research in the Digital Age* — free at [bitbybitbook.com](https://www.bitbybitbook.com)
- Törnberg (2023) — "ChatGPT-4 Outperforms Experts and Crowd Workers in Annotating Political Twitter Messages" — *PLOS ONE*
- Argyle et al. (2023) — "Out of One, Many: Using Language Models to Simulate Human Samples" — *Political Analysis*
- Buolamwini & Gebru (2018) — "Gender Shades" — *FAccT*

---

## IQSS AI Initiatives

IQSS is actively building infrastructure and programming to support AI-enabled social science research across Harvard:

- **AI Literacy for Researchers** — Workshop series on responsible AI use in research design, data collection, and analysis
- **Computational Social Science Working Group** — Monthly meetings for researchers using computational methods; presentations and code-sharing welcome
- **AI & Research Ethics Forum** — Joint initiative with the Harvard Data Science Initiative examining governance, bias, and transparency in AI-assisted research
- **GPU Cluster Access** — IQSS researchers can request priority access to Harvard's high-performance computing resources for training and fine-tuning models

For more information, contact [IQSS Research Computing](mailto:info@iq.harvard.edu).

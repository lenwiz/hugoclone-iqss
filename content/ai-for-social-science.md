---
title: "AI for Social Science"
date: 2026-07-14
draft: false
layout: "ai-social-science"
subtitle: "Practical tools, methods, and Harvard resources for integrating artificial intelligence into social science research at IQSS."
---

## Why AI for Social Science?

Artificial intelligence is reshaping what is possible in social science research. Tasks that once required years of manual coding — classifying thousands of survey responses, reading millions of news articles, transcribing oral histories — can now be completed in hours. More importantly, AI opens entirely new research designs: detecting patterns across text corpora too large for any team, generating synthetic survey populations for power analysis, or applying computer vision to historical photographs and satellite imagery.

This page is a practical guide to the tools, methods, and active use cases most relevant to <abbr title="Institute for Quantitative Social Science">IQSS</abbr> researchers. It is organized by research task so you can find the right approach for your problem. IQSS researchers have already applied these methods to the [Cooperative Election Study](https://cces.gov.harvard.edu/), the [Murray Research Archive](https://murray.harvard.edu/), [Harvard Dataverse](https://dataverse.harvard.edu/), and the [China Biographical Database (CBDB)](https://projects.iq.harvard.edu/cbdb/home) — illustrative examples appear throughout.

<div class="info-box" role="note" aria-label="Harvard AI tools and workshops quick links">
<p><strong>Harvard AI Resources at a Glance:</strong> Harvard-licensed AI tools — Anthropic Claude and Google Gemini — are available to affiliates via <a href="https://www.huit.harvard.edu/anthropic-claude">HUIT</a> and <a href="https://atg.fas.harvard.edu/ai-at-fas">FAS Academic Technology</a>. For GPU computing, use <a href="https://www.rc.fas.harvard.edu/">FASRC</a>. For upcoming workshops, see <a href="https://www.iq.harvard.edu/training-workshops">IQSS Training &amp; Workshops</a>. For a personal consultation, contact <a href="https://dss.iq.harvard.edu">Data Science Services (DSS)</a>.</p>
</div>

---

## Large Language Models (LLMs) in Research

Large language models like Claude, GPT-4o, and Llama are the most versatile AI tools now available to researchers. Harvard affiliates have licensed access to several of these — see [Harvard AI Tools & Platforms](#harvard-ai-tools--platforms) below.

### What Researchers Are Doing with LLMs

**Text classification and coding** — <abbr title="Large Language Models">LLMs</abbr> can apply researcher-defined coding schemes to open-ended responses, legislative transcripts, social media posts, or news archives. In many studies, GPT-4 and Claude match or exceed inter-rater reliability between human coders, at a fraction of the cost and time. See: [Argyle et al. 2023, "Out of One, Many"](https://doi.org/10.1017/pan.2023.2); Gilardi et al. 2023.

At IQSS, researchers have applied LLMs to code open-ended survey responses from the [Cooperative Election Study (CES)](https://cces.gov.harvard.edu/) — one of the largest academic election surveys in the U.S., with 60,000+ respondents annually — and to classify and summarize interview transcripts archived in the [Henry A. Murray Research Archive](https://murray.harvard.edu/), Harvard's longitudinal archive of American lives.

**Synthetic respondents and survey simulation** — LLMs conditioned on demographic profiles can simulate survey responses, enabling pre-study power analysis, testing question wording, or studying populations that are hard to sample. *Use with caution*: synthetic respondents replicate training-data biases and cannot substitute for real human data in causal claims.

**Interview and focus group analysis** — Qualitative data from hundreds of interviews can be thematically coded, summarized by subgroup, and queried interactively using retrieval-augmented generation (RAG).

**Literature review acceleration** — Tools like [Elicit](https://elicit.com/), [ResearchRabbit](https://www.researchrabbit.ai/), and [Semantic Scholar's API](https://api.semanticscholar.org/) use LLMs to screen abstracts, extract effect sizes, and map citation networks, compressing systematic review timelines substantially.

**Hypothesis generation** — Researchers use LLMs to brainstorm mechanisms, identify overlooked moderators, and stress-test theoretical arguments before data collection.

### Recommended Tools

<div class="card-grid" role="region" aria-label="Recommended AI tools for research">
<div class="card">
<h3>Claude (Anthropic)</h3>
<p>Strong at nuanced instruction-following, long documents (up to 200K tokens), and structured output. Well-suited for qualitative coding tasks with complex schemas. <strong>Available to Harvard affiliates via <a href="https://www.huit.harvard.edu/anthropic-claude">HUIT</a></strong>; primary FAS AI tool as of 2026.</p>
</div>
<div class="card">
<h3>Gemini (Google)</h3>
<p>Extremely long context window (1M tokens) — useful for processing entire books or legislative sessions in a single call. <strong>Primary AI service for all FAS students and staff</strong> via Google Workspace; no additional sign-up required. See <a href="https://atg.fas.harvard.edu/ai-at-fas">FAS Academic Technology</a>.</p>
</div>
<div class="card">
<h3>GPT-4o (OpenAI)</h3>
<p>Broad capability, multimodal (text + images), extensive Python API ecosystem. Most benchmarked model in published social science studies to date. Available via <a href="https://atg.fas.harvard.edu/ai-at-fas">FAS Academic Technology</a>.</p>
</div>
<div class="card">
<h3>Llama 3 (Meta, open)</h3>
<p>Open-weights model you can run on <a href="https://www.rc.fas.harvard.edu/">FASRC clusters</a> or locally. No data leaves your environment — critical for sensitive survey data or <abbr title="Institutional Review Board">IRB</abbr>-restricted datasets classified above DSL3.</p>
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

## Harvard AI Tools & Platforms

Harvard provides researchers with licensed access to leading AI platforms and substantial computing infrastructure. The following are available to Harvard-affiliated researchers.

<div class="card-grid" role="region" aria-label="Harvard AI platforms and research computing resources">
<div class="card">
<h3><a href="https://www.huit.harvard.edu/anthropic-claude">HUIT: Anthropic Claude</a></h3>
<p>Harvard's primary AI platform for affiliates. Anthropic Claude is available through HUIT for research, analysis, and coursework. Approved for Harvard data up to DSL3 (de-identified or otherwise restricted data with approved access). HarvardKey login required.</p>
</div>
<div class="card">
<h3><a href="https://atg.fas.harvard.edu/ai-at-fas">FAS AI Tools (Gemini, GPT)</a></h3>
<p>Faculty of Arts &amp; Sciences maintains Google Gemini as the primary AI service for FAS students, alongside Claude and GPT-4o. Managed by FAS Academic Technology, with guidance on appropriate academic and research use.</p>
</div>
<div class="card">
<h3><a href="https://www.rc.fas.harvard.edu/">FASRC: Research Computing</a></h3>
<p>The FAS Research Computing Cannon cluster provides 100,000+ cores and 1,000+ GPUs (including NVIDIA A100s), with a dedicated <a href="https://docs.gpu.rc.harvard.edu/">Central GPU cluster</a> for AI/ML. Essential for training, large inference, or fine-tuning open-weight models. Free to Harvard researchers.</p>
</div>
<div class="card">
<h3><a href="https://dataverse.harvard.edu/">Harvard Dataverse</a></h3>
<p>IQSS-maintained open data repository with 100,000+ datasets from Harvard researchers. Version 6.7 includes an AI Guide and a Model Context Protocol (MCP) server for AI-assisted data discovery. Deposit your replication data and prompts here.</p>
</div>
</div>

<div class="card-grid" role="region" aria-label="Harvard library, data privacy, and IQSS research tools">
<div class="card">
<h3><a href="https://guides.library.harvard.edu/airesearch">Harvard Library: AI Research Guide</a></h3>
<p>The Harvard Library's curated guide to AI tools for academic research, including tool comparisons, citation practices for AI-generated content, and discipline-specific resources. Regularly updated by subject librarians.</p>
</div>
<div class="card">
<h3><a href="https://bokcenter.harvard.edu/getting-started-huit-supported-ai-tools">Bok Center: Getting Started with HUIT AI</a></h3>
<p>Practical orientation to Harvard's supported AI tools — what each does, how they differ, and how to use them appropriately in research and teaching contexts.</p>
</div>
<div class="card">
<h3><a href="https://opendp.org/">OpenDP</a></h3>
<p>IQSS-developed open-source toolkit for differential privacy — enabling statistically sound analysis of sensitive data without exposing individual records. Used by the U.S. Census Bureau and other statistical agencies.</p>
</div>
<div class="card">
<h3><a href="https://policy.security.harvard.edu/data-classification">Harvard Data Classification</a></h3>
<p>Before processing research data with any AI tool, verify its classification level. HUIT AI tools are approved for DSL1–3. DSL4+ data (HIPAA, SSN, FERPA) must not be sent to commercial APIs — use FASRC with local models instead.</p>
</div>
</div>

---

## Natural Language Processing (NLP)

<abbr title="Natural Language Processing">NLP</abbr> methods, many now powered by transformer-based models, remain the workhorse of computational social science.

### Core Methods

**Sentiment analysis** — Classify text as positive, negative, or neutral. Modern models (RoBERTa, VADER for social media, FinBERT for financial text) far outperform dictionary-based approaches on domain-specific corpora.

**Topic modeling** — BERTopic and Top2Vec use sentence embeddings to discover coherent topics without hand-tuning the number of topics, overcoming a key limitation of LDA. Useful for press coverage, legislative speech, or social media corpora.

**Named entity recognition (<abbr title="Named Entity Recognition">NER</abbr>)** — Automatically tag people, organizations, locations, and dates in text. Enables large-scale network construction from news archives or corporate filings. The [China Biographical Database (CBDB)](https://projects.iq.harvard.edu/cbdb/home) at IQSS applies NER and entity resolution to millions of records spanning 2,000 years of Chinese biographical history — one of the largest historical NLP projects in the humanities.

**Stance and framing detection** — Beyond sentiment, models can classify whether a text *supports or opposes* a proposition, or detect rhetorical frames (e.g., economic vs. moral framing of immigration).

**Text-as-data scaling** — Wordfish, Wordscores, and supervised scaling models place political actors on a latent ideological dimension using their speech. Now extended with transformer embeddings.

### Key Python Libraries

<figure>
<figcaption style="font-size:13px;font-weight:600;color:#555;margin-bottom:6px;">Python: sentiment classification, topic modeling, and named entity recognition</figcaption>
<pre style="background:#1e2d3d;color:#e8f0f8;padding:20px 25px;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.6;"><code># Sentiment / classification
from transformers import pipeline
classifier = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")

# Topic modeling
from bertopic import BERTopic
model = BERTopic(language="english")
topics, probs = model.fit_transform(docs)

# NER
import spacy
nlp = spacy.load("en_core_web_trf")
doc = nlp("The World Bank announced a new initiative in Geneva.")</code></pre>
</figure>

### Key R Packages

- **[quanteda](https://quanteda.io/)** — Fast, flexible text analysis framework for R; excellent for large corpora
- **[tidytext](https://juliasilge.github.io/tidytext/)** — Tidy-principles text mining; integrates cleanly with dplyr/ggplot2
- **[stm](https://www.structuraltopicmodel.com/)** — Structural Topic Model; incorporates document-level metadata as covariates
- **text** — Bridges R and transformer models via Python's `transformers` library

DSS offers [workshop materials](https://iqss.github.io/dss-workshops/) on text analysis in R and Python; check the [IQSS workshop schedule](https://www.iq.harvard.edu/training-workshops) for live sessions.

---

## Computer Vision

Computer vision allows researchers to extract information from images and video at scale — a frontier that was simply inaccessible before deep learning.

### Use Cases in Social Science

**Satellite imagery analysis** — Estimate economic activity, poverty, conflict damage, or deforestation from publicly available satellite images (Sentinel-2, Landsat, Planet Labs). Jean et al. (2016) predicted poverty from nighttime lights; subsequent work uses daytime imagery with CNNs to predict household wealth at village level. Harvard's [Center for Geographic Analysis (CGA)](https://gis.harvard.edu/), based at IQSS, offers training on combining satellite imagery with GIS tools and LLMs — see the [CGA 2026 training schedule](https://www.iq.harvard.edu/news/2025/12/explore-cgas-2026-training-schedule) for free workshops on LLM-based text classification with geospatial data.

**Historical photograph analysis** — Classify occupational dress, racial presentation, crowd demographics, or protest imagery across digitized archives, including collections held in [Harvard Dataverse](https://dataverse.harvard.edu/).

**Social media image coding** — Classify political ads, protest signs, or health behavior imagery on Instagram/Twitter at scale. Critical for computational framing studies.

**Street-level imagery** — Google Street View images have been used to study neighborhood change, physical disorder, green space, and political attitudes (e.g., Gebru et al. 2017 predicted voting patterns from car types).

**Facial analysis** — Estimate age, emotion, or attention in experimental settings. *High bias risk*: commercial facial analysis systems perform significantly worse on darker-skinned faces (Buolamwini & Gebru 2018). Always audit your model on your specific population.

### Recommended Tools

- **[Roboflow](https://roboflow.com/)** — No-code platform for building custom image classifiers; good for labeling and training on small research-specific categories
- **Google Vision API / AWS Rekognition** — Hosted APIs for object detection, OCR, and face analysis; fast to prototype, but data leaves your environment
- **PyTorch + HuggingFace** — Full control; use pretrained ResNet, ViT, or CLIP models fine-tuned on your labeled dataset
- **CLIP (OpenAI)** — Zero-shot image classification using text descriptions; useful when you cannot collect labeled training data

---

## Causal Inference with Machine Learning

The combination of causal inference frameworks and ML predictive power — sometimes called "causal ML" — is one of the most active methodological frontiers in social science.

### Methods

**Double/Debiased Machine Learning (<abbr title="Double/Debiased Machine Learning">DML</abbr>)** — Uses ML to flexibly control for high-dimensional confounders while estimating a causal effect. The `DoubleML` package in Python and R implements this for a range of estimands.

**Causal Forests (Generalized Random Forests)** — Estimates heterogeneous treatment effects: not just the average effect of a policy, but *for whom* the effect is larger or smaller. Implemented in the `grf` R package (Athey, Tibshirani, Wager 2019).

**<abbr title="Bayesian Additive Regression Trees">BART</abbr> (Bayesian Additive Regression Trees)** — Non-parametric Bayesian model widely used for estimating treatment effects in observational studies. `BART` and `bartCause` packages in R.

**Synthetic Control with ML** — The `augsynth` package extends synthetic control methods with ML outcome models, reducing bias when pre-treatment fit is imperfect.

**Difference-in-Differences with Staggered Adoption** — New estimators (Callaway & Sant'Anna, Sun & Abraham, Roth et al.) correct the "bad comparisons" problem in two-way fixed effects models when treatment timing varies. Packages: `did`, `staggered` in R.

[Harvard Dataverse](https://dataverse.harvard.edu/) hosts thousands of replication datasets from published social science studies — a valuable benchmark source for validating causal ML implementations against published results, and a standard venue for depositing your own replication materials.

### Key Resources

- **Athey & Imbens (2019)** — "Machine Learning Methods That Economists Should Know About" — *Annual Review of Economics*
- **[Cunningham (2021)](https://mixtape.scunning.com/)** — *Causal Inference: The Mixtape* (free online) — includes ML chapters
- **[The Effect (Huntington-Klein)](https://theeffectbook.net/)** — Free textbook with R and Python code
- **[EconML (Microsoft)](https://github.com/py-why/EconML)** — Python library for causal ML, including DML, causal forests, and instrumental variable forests

---

## Survey Research and Measurement

**Automated open-end coding** — Apply LLMs or fine-tuned classifiers to open-ended survey responses. The [Cooperative Election Study (CES)](https://cces.gov.harvard.edu/), with decades of publicly available data, provides an excellent benchmark corpus; [IQSS Data Science Services](https://dss.iq.harvard.edu) can advise on validation approaches.

**Adaptive survey design** — ML models can predict survey breakoff, recommend follow-up questions based on prior responses, or flag likely satisficers in real time during data collection.

**Record linkage and deduplication** — Models like `dedupe` (Python) or `fastLink` (R) use probabilistic matching to link survey respondents to administrative records or across waves without shared unique identifiers.

**Embedding-based question similarity** — Sentence transformers can identify conceptually equivalent survey items across different instruments, enabling cross-study comparisons without identical wording. The [Murray Research Archive](https://murray.harvard.edu/) hosts longitudinal survey instruments spanning decades — a rich resource for this kind of harmonization work.

---

## Network Analysis at Scale

**Community detection** — Algorithms like the Louvain method and HDBSCAN applied to large social networks (Twitter/X follower graphs, co-authorship networks, legislative cosponsorship) can identify clusters without specifying the number of communities in advance.

**Temporal network analysis** — Track how communities form, merge, and dissolve over time. The `networkx` (Python) and `igraph` (R/Python) libraries support dynamic network objects.

**Text-network integration** — Combine NLP-derived ties (who cites whom, who is mentioned together) with relational data to build richer network structures. The `text2map` R package bridges text and network methods.

---

## Research Ethics and Responsible AI Use

Using AI in social science research raises methodological and ethical obligations:

### Data Privacy and Harvard Data Classification

- **Before using any AI tool with research data**, check [Harvard's data classification policy](https://policy.security.harvard.edu/data-classification). HUIT AI tools (Claude, Gemini) are approved for data up to **DSL3** — de-identified or otherwise restricted data with an approved access pathway. Data at **DSL4 or above** — including HIPAA-covered health records, Social Security Numbers, and FERPA-protected student records — must not be sent to commercial AI APIs.
- For sensitive or <abbr title="Institutional Review Board">IRB</abbr>-restricted data, run local open-weight models (Llama 3, Mistral) on [FASRC clusters](https://www.rc.fas.harvard.edu/), where data stays within Harvard's infrastructure.
- De-identify before processing. Even "anonymized" free text can re-identify respondents when passed to external systems.

### Bias and Validity

- **Audit for differential performance** across subgroups before relying on AI labels for any analysis involving race, gender, national origin, or other protected characteristics.
- LLMs encode the biases present in their training data. Classifications of politically or culturally sensitive content should always include human validation.
- Report inter-rater reliability (Cohen's κ or Krippendorff's α) between AI labels and human ground truth in your methods section.

### Transparency and Reproducibility

- Report the model name, version, and exact prompt used for any AI-generated labels or classifications. These are methodological choices that affect replication.
- API models are updated silently; freeze your model version (e.g., `claude-3-5-sonnet-20241022`) to ensure reproducibility.
- Publish your prompts and validation codebooks as supplementary materials — [Harvard Dataverse](https://dataverse.harvard.edu/) is the standard repository for IQSS research outputs.

### IRB Considerations

- Using LLMs to analyze human-generated text generally does not require new IRB approval if the original data collection was approved and the AI is performing the same analytic task as a human coder.
- Generating synthetic respondent data and publishing it as if it were real survey data raises ethical concerns — consult your IRB.
- Automated systems that directly affect research subjects (e.g., adaptive interventions, content moderation) typically require explicit IRB review.

---

## Getting Started at IQSS

<div class="info-box" role="note" aria-label="IQSS Data Science Services consultation information">
<p><strong>Data Science Services (<abbr title="Data Science Services">DSS</abbr>)</strong> at <abbr title="Institute for Quantitative Social Science">IQSS</abbr> offers individual consultations on research design, statistical methods, and computational approaches including AI/ML. Schedule at <a href="https://dss.iq.harvard.edu">dss.iq.harvard.edu</a> or email <a href="mailto:help@iq.harvard.edu">help@iq.harvard.edu</a>.</p>
</div>

### Workshops & Training

IQSS and its affiliated centers run a regular schedule of workshops on computational methods, data analysis, and AI for social science. All workshops are free for Harvard affiliates.

<div class="card-grid" role="region" aria-label="IQSS workshops and training resources">
<div class="card">
<h3><a href="https://www.iq.harvard.edu/training-workshops">IQSS Training &amp; Workshops</a></h3>
<p>Live workshop schedule covering text analysis, machine learning, R, Python, Stata, GIS, and more. Register for upcoming sessions or join the waitlist. Check here first for the current semester's offerings.</p>
</div>
<div class="card">
<h3><a href="https://iqss.github.io/dss-workshops/">DSS Workshop Materials</a></h3>
<p>Self-paced materials covering R, Python, Stata, and data science tools — available at any time, no registration required. Each module is self-contained and suitable for independent study.</p>
</div>
<div class="card">
<h3><a href="https://www.iq.harvard.edu/news/2025/12/explore-cgas-2026-training-schedule">CGA 2026 Workshops</a></h3>
<p>The Center for Geographic Analysis offers free workshops for Harvard ID holders on GIS, spatial analysis, and LLM-based geospatial text classification. Includes hands-on Python sessions with real-world Twitter data.</p>
</div>
<div class="card">
<h3><a href="https://bokcenter.harvard.edu/getting-started-huit-supported-ai-tools">Bok Center: HUIT AI Tools</a></h3>
<p>Orientation to Harvard's officially supported AI platforms — Claude, Gemini, and others — with practical guidance on using them for research and teaching.</p>
</div>
</div>

### Recommended Learning Path

**If you are new to AI/ML in research:**
1. Attend an [IQSS DSS workshop](https://www.iq.harvard.edu/training-workshops) on text analysis or computational methods
2. Work through [DSS self-paced materials](https://iqss.github.io/dss-workshops/) on Python or R at your own pace
3. Read *Bit by Bit: Social Research in the Digital Age* ([Salganik, free online](https://www.bitbybitbook.com))
4. Explore the [Harvard Library AI Research Guide](https://guides.library.harvard.edu/airesearch) for curated tool comparisons and discipline-specific resources

**If you have programming experience:**
1. Access [HUIT's Claude](https://www.huit.harvard.edu/anthropic-claude) and run a pilot coding task on a small, hand-labeled sample
2. Work through the [HuggingFace NLP course](https://huggingface.co/learn/nlp-course/) (free, Python-based)
3. Explore [`tidymodels`](https://www.tidymodels.org/) (R) or [`scikit-learn`](https://scikit-learn.org/) (Python)
4. Book a [DSS consultation](https://dss.iq.harvard.edu) for feedback on your validation approach before scaling

**If you are ready to scale:**
1. Request access to [FASRC](https://www.rc.fas.harvard.edu/) for GPU-enabled jobs — fine-tuning, large inference batches, or sensitive data that cannot leave Harvard's infrastructure
2. Explore open-weight models (Llama 3, Mistral) runnable on FASRC for DSL4+ data
3. Deposit your data, code, and prompts in [Harvard Dataverse](https://dataverse.harvard.edu/) for reproducibility
4. Contact [DSS](https://dss.iq.harvard.edu) for a consultation on your specific research design

### Key Readings

- Grimmer, Roberts & Stewart (2022) — *Text as Data: A New Framework for Machine Learning and the Social Sciences* — Princeton University Press
- Salganik (2018) — *Bit by Bit: Social Research in the Digital Age* — free at [bitbybitbook.com](https://www.bitbybitbook.com)
- Törnberg (2023) — "ChatGPT-4 Outperforms Experts and Crowd Workers in Annotating Political Twitter Messages" — *PLOS ONE*
- Argyle et al. (2023) — ["Out of One, Many: Using Language Models to Simulate Human Samples"](https://doi.org/10.1017/pan.2023.2) — *Political Analysis*
- Buolamwini & Gebru (2018) — "Gender Shades" — *FAccT*
- [Harvard Library AI Research Guide](https://guides.library.harvard.edu/airesearch) — Updated resource lists maintained by Harvard subject librarians

---

## IQSS AI Initiatives

IQSS is actively building infrastructure and programming to support AI-enabled social science research across Harvard:

- **[AI Literacy for Researchers](https://www.iq.harvard.edu/training-workshops)** — Workshop series on responsible AI use in research design, data collection, and analysis. See the current schedule on the IQSS Training & Workshops page.
- **Computational Social Science Working Group** — Monthly meetings for researchers using computational methods; presentations and code-sharing welcome. Contact [info@iq.harvard.edu](mailto:info@iq.harvard.edu) to join.
- **AI & Research Ethics Forum** — Joint initiative with the Harvard Data Science Initiative examining governance, bias, and transparency in AI-assisted research.
- **[OpenDP](https://opendp.org/)** — IQSS-developed open-source toolkit for differential privacy, enabling statistically sound analysis of sensitive data without exposing individual records. Adopted by the U.S. Census Bureau and other major statistical agencies.
- **[Harvard Dataverse](https://dataverse.harvard.edu/)** — IQSS-maintained open data repository now supporting AI-assisted data discovery through an integrated AI Guide and MCP server (v6.7+). Over 100,000 datasets available for research use.
- **[Cooperative Election Study (CES)](https://cces.gov.harvard.edu/)** — Harvard's flagship survey of American voting and public opinion (60,000+ respondents annually), widely used as a benchmark corpus for AI-assisted survey analysis methods.
- **[China Biographical Database (CBDB)](https://projects.iq.harvard.edu/cbdb/home)** — IQSS historical database applying NER and entity resolution across 2,000 years of Chinese biographical records — a flagship project in computational humanities.
- **[Murray Research Archive](https://murray.harvard.edu/)** — Harvard's longitudinal human subjects data archive, housing decades of social science studies and supporting text analysis workflows for researchers.
- **[Center for Geographic Analysis (CGA)](https://gis.harvard.edu/)** — IQSS-affiliated center running a [2026 GIS and AI workshop series](https://www.iq.harvard.edu/news/2025/12/explore-cgas-2026-training-schedule), including LLM-based geospatial text classification.
- **GPU Cluster Access** — IQSS researchers can request priority access to [FASRC](https://www.rc.fas.harvard.edu/) high-performance computing resources for training and fine-tuning models on large research corpora.

For more information, contact [IQSS Research Computing](mailto:info@iq.harvard.edu).

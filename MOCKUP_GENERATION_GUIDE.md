# Portfolio Mockup Generation Guide

This guide explains exactly how to generate the consistent MacBook Pro mockups used in the Lopes2Tech portfolio. Follow these steps to ensure all project images have the same high-quality, professional look.

## 1. Capture Website Screenshot

First, you need a high-quality screenshot of the project's hero section.

**Tool:** Browser / Screenshot Tool
**Resolution:** `1280x800` (Standard Desktop)
**Format:** `.png`

**Instructions:**
1.  Navigate to the project's URL (e.g., `https://costeleta-dourada.vercel.app/`).
2.  Resize the browser window to **1280 width x 800 height**.
3.  Wait for the page to fully load (ensure animations or hero images are visible).
4.  Take a screenshot.
    *   *Agent Instruction:* Use `browser_subagent` or `capture_browser_screenshot` with `width=1280`, `height=800`.

---

## 2. Generate the Mockup

Use an AI image generation tool (like the `generate_image` tool) to create the final mockup.

**Input Image:** The screenshot captured in Step 1.
**Prompt Template:**

use the following prompt, replacing `[INSERT BACKGROUND DESCRIPTION]` with your specific requirement (e.g., "a typical Alentejo restaurant", "a modern creative office", "a minimalist wooden desk").

```text
A photorealistic high-resolution mockup of a silver MacBook Pro sitting on a rustic wooden table in [INSERT BACKGROUND DESCRIPTION]. The screen displays the provided website screenshot perfectly fitted. The restaurant background should be warm and inviting, featuring traditional elements like stone walls, clay pottery, a bottle of red wine, and maybe a cork decoration. Soft, warm natural lighting. The focus is on the laptop screen, showing the website clearly. Professional product photography style.
```

*Note: You may adjust the "restaurant" and specific background props (wine, clay pottery) in the prompt above to match the specific vibe of the project you are adding. For example, for a tech project, you might switch "restaurant" to "office" and "clay pottery" to "plants and coffee mug".*

**Standard "Alentejo Restaurant" Prompt (Costeleta Dourada Example):**
> "A photorealistic high-resolution mockup of a silver MacBook Pro sitting on a rustic wooden table in a typical Alentejo restaurant in Portugal. The screen displays the provided website screenshot perfectly fitted. The restaurant background should be warm and inviting, featuring traditional elements like stone walls, clay pottery, a bottle of red wine, and maybe a cork decoration. Soft, warm natural lighting. The focus is on the laptop screen, showing the 'Costeleta Dourada' website with its golden meat animation clearly visible. Professional product photography style."

---

## 3. Implementation

1.  Save the generated image to `src/assets/public/proj/` (or `public/proj/` depending on your structure).
2.  Naming convention: `[project_name]_mockup.png` (e.g., `costeleta_mockup.png`).
3.  Update `portfolio.html` and translation files as usual.

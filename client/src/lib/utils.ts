import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Opens Google Colab with the provided code in a new notebook
 * @param code - The Python code to include in the notebook
 * @param title - Optional title for the notebook
 */
export function openInColab(code: string, title: string = "PSX Analytics") {
  try {
    // Validate inputs
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid code provided');
    }

    // Sanitize title to prevent path traversal
    const sanitizedTitle = title
      .replace(/[^a-zA-Z0-9\s_-]/g, '')
      .trim()
      .substring(0, 100) || "PSX_Analytics";

    // Create a Colab notebook JSON structure
    const notebook = {
    cells: [
      {
        cell_type: "markdown",
        metadata: {},
        source: [
          `# ${title}\n`,
          "\n",
          "This notebook was generated from PSX Analytics Companion.\n"
        ]
      },
      {
        cell_type: "code",
        execution_count: null,
        metadata: {
          id: "code-cell"
        },
        source: code.split('\n').map(line => line + '\n'),
        outputs: []
      }
    ],
    metadata: {
      colab: {
        name: title,
        private_outputs: false,
        provenance: [],
        toc_visible: true
      },
      kernelspec: {
        display_name: "Python 3",
        name: "python3"
      },
      language_info: {
        name: "python"
      }
    },
    nbformat: 4,
    nbformat_minor: 0
  };

    // Convert notebook to JSON string
    const notebookJson = JSON.stringify(notebook, null, 2);
    
    // Create a blob and download the notebook
    const blob = new Blob([notebookJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${sanitizedTitle.replace(/\s+/g, '_')}.ipynb`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Open Colab in a new tab
    // The user can upload the downloaded .ipynb file to Colab
    const colabWindow = window.open('https://colab.research.google.com/', '_blank', 'noopener,noreferrer');
    if (!colabWindow) {
      console.warn('Popup blocked. Please allow popups for this site.');
    }
    
    // Also copy code to clipboard as a fallback
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).catch(() => {
        // Silently fail if clipboard access is denied
        console.warn('Failed to copy code to clipboard');
      });
    }
  } catch (error) {
    console.error('Error opening in Colab:', error);
    throw error;
  }
}

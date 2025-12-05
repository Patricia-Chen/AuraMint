import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch
from matplotlib.patches import Rectangle

# Create figure
fig, ax = plt.subplots(1, 1, figsize=(12, 10))
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis('off')

# Color scheme - Morandi colors
color_frontend = '#A8B5A8'  # Light gray-green
color_contract = '#8B9D83'  # Sage green
color_blockchain = '#9DB4A3'  # Mint green
color_storage = '#D4B5A0'  # Almond
color_arrow = '#6a7a6a'  # Dark gray-green

# Title
ax.text(5, 9.5, 'AuraMint System Architecture', 
        fontsize=22, weight='bold', ha='center', va='top',
        color='#4a5a4a')

# Layer 1: Frontend (Top)
frontend_box = FancyBboxPatch((1.5, 7), 7, 1.5,
                              boxstyle="round,pad=0.1",
                              edgecolor=color_frontend,
                              facecolor=color_frontend,
                              linewidth=3,
                              alpha=0.7)
ax.add_patch(frontend_box)
ax.text(5, 7.95, 'Web Browser', fontsize=14, weight='bold', ha='center', va='center', color='white')
ax.text(5, 7.55, 'React 16 + Web3.js 1.2.2', fontsize=11, ha='center', va='center', color='white')
ax.text(5, 7.2, 'User Interface & Blockchain Interaction', fontsize=9, ha='center', va='center', 
        color='white', style='italic')

# Arrow 1: Frontend to Smart Contract
arrow1 = FancyArrowPatch((5, 7), (5, 5.8),
                         arrowstyle='->,head_width=0.4,head_length=0.4',
                         color=color_arrow,
                         linewidth=3,
                         mutation_scale=20)
ax.add_patch(arrow1)
ax.text(5.8, 6.4, 'Web3.js API', fontsize=10, ha='left', va='center', 
        color=color_arrow, weight='bold')
ax.text(5.8, 6.1, 'Send transactions\nCall functions', fontsize=8, ha='left', va='center', 
        color=color_arrow)

# Layer 2: Smart Contract (Middle)
contract_box = FancyBboxPatch((1.5, 4.3), 7, 1.5,
                              boxstyle="round,pad=0.1",
                              edgecolor=color_contract,
                              facecolor=color_contract,
                              linewidth=3,
                              alpha=0.7)
ax.add_patch(contract_box)
ax.text(5, 5.45, 'Smart Contract', fontsize=14, weight='bold', ha='center', va='center', color='white')
ax.text(5, 5.05, 'ArmorAuction.sol (Solidity 0.8.0)', fontsize=11, ha='center', va='center', color='white')
ax.text(5, 4.7, 'ERC721 + Auction Logic', fontsize=9, ha='center', va='center', 
        color='white', style='italic')

# Arrow 2: Smart Contract to Blockchain
arrow2 = FancyArrowPatch((5, 4.3), (5, 3.1),
                         arrowstyle='->,head_width=0.4,head_length=0.4',
                         color=color_arrow,
                         linewidth=3,
                         mutation_scale=20)
ax.add_patch(arrow2)
ax.text(5.8, 3.7, 'State Changes', fontsize=10, ha='left', va='center', 
        color=color_arrow, weight='bold')
ax.text(5.8, 3.4, 'Store on-chain\nEmit events', fontsize=8, ha='left', va='center', 
        color=color_arrow)

# Layer 3: Blockchain (Bottom)
blockchain_box = FancyBboxPatch((1.5, 1.6), 7, 1.5,
                                boxstyle="round,pad=0.1",
                                edgecolor=color_blockchain,
                                facecolor=color_blockchain,
                                linewidth=3,
                                alpha=0.7)
ax.add_patch(blockchain_box)
ax.text(5, 2.75, 'Ethereum Network', fontsize=14, weight='bold', ha='center', va='center', color='white')
ax.text(5, 2.35, 'Ganache (Local Testnet)', fontsize=11, ha='center', va='center', color='white')
ax.text(5, 2.0, 'Immutable Ledger & Consensus', fontsize=9, ha='center', va='center', 
        color='white', style='italic')

# Side box: Off-chain Storage
storage_box = FancyBboxPatch((0.3, 4.5), 1.0, 1.0,
                             boxstyle="round,pad=0.05",
                             edgecolor=color_storage,
                             facecolor=color_storage,
                             linewidth=2,
                             alpha=0.7)
ax.add_patch(storage_box)
ax.text(0.8, 5.3, 'Off-Chain', fontsize=9, weight='bold', ha='center', va='center', color='white')
ax.text(0.8, 4.95, 'Storage', fontsize=9, weight='bold', ha='center', va='center', color='white')
ax.text(0.8, 4.7, 'localStorage', fontsize=7, ha='center', va='center', color='white')

# Arrow 3: Frontend to localStorage
arrow3 = FancyArrowPatch((1.5, 7.5), (1.3, 5.5),
                         arrowstyle='<->,head_width=0.3,head_length=0.3',
                         color=color_storage,
                         linewidth=2,
                         linestyle='dashed',
                         mutation_scale=15)
ax.add_patch(arrow3)
ax.text(0.5, 6.5, 'Cache\nMetadata', fontsize=7, ha='center', va='center', 
        color=color_storage, style='italic')

# Key Functions Box (Right side)
functions_box = FancyBboxPatch((8.8, 4.3), 1.0, 1.5,
                               boxstyle="round,pad=0.05",
                               edgecolor='#6a7a6a',
                               facecolor='white',
                               linewidth=2,
                               alpha=0.9)
ax.add_patch(functions_box)
ax.text(9.3, 5.5, 'Key', fontsize=9, weight='bold', ha='center', va='top', color='#4a5a4a')
ax.text(9.3, 5.25, 'Functions', fontsize=9, weight='bold', ha='center', va='top', color='#4a5a4a')
ax.text(9.3, 4.95, '• applyArts()', fontsize=6.5, ha='center', va='top', color='#4a5a4a', family='monospace')
ax.text(9.3, 4.75, '• startAuction()', fontsize=6.5, ha='center', va='top', color='#4a5a4a', family='monospace')
ax.text(9.3, 4.55, '• bid()', fontsize=6.5, ha='center', va='top', color='#4a5a4a', family='monospace')
ax.text(9.3, 4.35, '• claim()', fontsize=6.5, ha='center', va='top', color='#4a5a4a', family='monospace')

# Data Flow Legend (Bottom)
legend_y = 0.8
ax.text(1, legend_y, 'On-Chain Data:', fontsize=9, weight='bold', ha='left', va='center', color='#4a5a4a')
ax.text(1, legend_y-0.25, '• NFT Ownership (ERC721)', fontsize=7, ha='left', va='center', color='#4a5a4a')
ax.text(1, legend_y-0.45, '• Auction State', fontsize=7, ha='left', va='center', color='#4a5a4a')
ax.text(1, legend_y-0.65, '• Transaction History', fontsize=7, ha='left', va='center', color='#4a5a4a')

ax.text(5.5, legend_y, 'Off-Chain Data:', fontsize=9, weight='bold', ha='left', va='center', color='#4a5a4a')
ax.text(5.5, legend_y-0.25, '• Full AI Prompts', fontsize=7, ha='left', va='center', color='#4a5a4a')
ax.text(5.5, legend_y-0.45, '• Metadata Cache', fontsize=7, ha='left', va='center', color='#4a5a4a')
ax.text(5.5, legend_y-0.65, '• (Gas Optimization)', fontsize=7, ha='left', va='center', 
        color='#4a5a4a', style='italic')

# Save figure
plt.tight_layout()
plt.savefig('d:/hkust/BCPro/Dapp-NFTAuction/architecture_diagram.png', 
            dpi=300, bbox_inches='tight', facecolor='#f5f5f5')
print("Architecture diagram saved as 'architecture_diagram.png'")
plt.close()

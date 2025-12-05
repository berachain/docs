# Curator

A **Curator** in the Bend ecosystem is an entity or individuals who aims to optimize the risk-adjusted returns for depositors based on a given strategy.

Curators are specifically responsible for the strategic curation of vaults, making key decisions about which markets to include, how capital is allocated, and how risk is curated within the vault structure. Their expertise directly impacts vault performance and security.

To learn more about Curators, see [Bend Docs Curators](/curators) section.

## The Curator's Responsibilities

A Curator's duties revolve around making high-level strategic decisions and managing risk.

- **Strategic Curation**: Defining the vault’s overall investment thesis. This includes selecting which markets or asset types are permitted for allocation.
- **Risk Parameterization**: Setting and maintaining the risk boundaries for the vault. This involves defining exposure limits (caps) to various risk factors to protect depositors' capital.

Crucially, nearly all of a Curator's significant actions are subject to a **timelock**, providing transparency and granting depositors a window to exit if they disagree with a proposed change.

## Curation within the Vault Role System

The Curator role is designed to be distinct from other vault management functions, creating a clear separation of duties.

- The **Owner** is the ultimate authority, with the power to appoint a `Curator`. The Owner's role is primarily administrative.
- The **Curator** defines the _strategy_ and _risk boundaries_. They decide **what** is possible within the vault (which markets, what max exposure).
- The **Allocator** is the _tactical portfolio manager_. Appointed by the Curator, the Allocator operates **within** the boundaries established by the Curator, deciding **how** to allocate capital among the permitted options to optimize yield. The `Allocator` role may also be assigned to the `PublicAllocator` contract after the vault owner has set the appropriate usage boundaries.

This structure ensures that strategic risk curation is separate from daily portfolio management (Allocation), leading to a more robust and secure system.

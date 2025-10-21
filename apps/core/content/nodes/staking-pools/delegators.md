# Delegation Guide (Validator Operators)

This guide shows validator operators how to use delegated capital to stand up and run a staking pool. It builds on the Installation guide and reuses the same helper scripts. It does not cover delegator actions; coordinate with your capital provider as needed.

See Installation first: `/nodes/staking-pools/installation`.

## Assumptions

- You completed the validator Installation steps (env configured, node synced).
- Your delegator has prepared a DelegationHandler and delegated funds for your validator pubkey.

You will only need the operator-facing helper scripts in `script/install-helpers/`.

## 1) Check readiness

Confirm the network, validator pubkey, and whether a delegated pool/handler is detected:

```bash
./status.sh
```

If a handler exists, the script displays delegated amounts and whether a pool already exists for your pubkey.

## 2) Create the pool with delegated funds (first 10,000 BERA)

If the pool is not yet created, use the delegated creation script. It consumes the first 10,000 BERA from the handler to register the validator and writes a ready-to-run command file. This step is the delegated equivalent of the self‑funded flow’s deployment branch in `activate.sh` (it performs the 10,000 BERA deposit and deploys the pool contracts).

```bash
./delegated-create-pool.sh
```

Run the generated shell script to submit the transaction, then wait for confirmation.

## 3) Activate the pool

Activation mirrors the Installation flow. After the validator is recognised as registered on the beacon chain, wait until the end of the next epoch (~192 blocks), then generate and execute the activation command with fresh proofs and a valid timestamp window. In delegated mode, `activate.sh` follows the “validator already registered” path; it emits only `activation-command.sh` (no deployment command):

```bash
./activate.sh --sr 0xSHARES_RECIPIENT --op 0xOPERATOR
```

Execute the generated `activation-command.sh` within ~10 minutes.

## 4) Deposit remaining delegated funds

After activation, deposit the remaining delegated funds to reach your target balance (for example, 250,000 BERA on Bepolia). The script writes a command file for you to execute.

```bash
./delegated-deposit.sh --amount 240000
```
f
## 5) Verify status

```bash
./status.sh
```

You should see contract addresses, the operator match on the beacon deposit contract, and the pool marked ACTIVE. The script also reports delegated amounts when a handler is present.

## 6) Withdraw yield (operator)

Operators can withdraw earned yield independently of principal. The helper script writes two commands (request, then complete after cooldown):

```bash
./delegated-withdraw-yield.sh --pubkey 0xYOUR_VALIDATOR_PUBKEY
```

Follow the prompts to execute the generated request and completion scripts after the cooldown.

Principal withdrawals are controlled by the delegator and are out of scope here.

## Notes

- All helper scripts write `cast` commands to files; review and run them yourself. Transactions are never sent automatically.
- Signing defaults to Ledger; set `PRIVATE_KEY` in `env.sh` if you prefer a local key.
- If you are self-funded, use `stake.sh` from the Installation guide instead of the delegated deposit flow.

## Where to next

- [Contract reference](/nodes/staking-pools/contracts.md) explains what you've deployed
- [Operator Guide](/nodes/staking-pools/operators.md) explains what a Stake Pool operator can do.


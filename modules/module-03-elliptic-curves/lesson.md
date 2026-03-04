# Module 3: Elliptic Curves

*Points on curves, ECDSA, and how Ethereum signs transactions.*

---

## How This Works

Everything you learned in Modules 1 and 2 — modular arithmetic, groups, fields, generators, Lagrange — now comes together on a single object: the elliptic curve. You'll work with the same equation as Ethereum's secp256k1 (y² = x³ + 7), just over a small field so you can do it by hand.

By the end, you'll sign and verify an ECDSA signature with pencil and paper, and understand every step from private key to Ethereum address.

**Primary curve**: y² = x³ + 7 over GF(11), group order 12, generator G = (7, 3).
**ECDSA curve** (Section 5): y² = x³ + x + 6 over GF(7), group order 11, G = (1, 1).

---

## Section 1: The Curve Equation

An **elliptic curve** over a finite field GF(p) is defined by:

```
y² = x³ + ax + b   (mod p)
```

For secp256k1: a = 0, b = 7, so y² = x³ + 7. We use the same equation over GF(11).

A point (x, y) is on the curve if and only if y² ≡ x³ + 7 (mod 11). For each x, we compute x³ + 7 mod 11 and check if the result is a **quadratic residue** (perfect square) mod 11.

**Squares mod 11**: 0² = 0, 1² = 1, 2² = 4, 3² = 9, 4² = 5, 5² = 3. So the quadratic residues are {0, 1, 3, 4, 5, 9}.

### Puzzle 1: Finding Points

For each x, compute x³ + 7 mod 11. Is the result a square?

```
x=2: x³+7 = 8+7 = 15 ≡ ? (mod 11). Square?
x=5: x³+7 = 125+7 = 132 ≡ ? (mod 11). Square?
x=8: x³+7 = 512+7 = 519 ≡ ? (mod 11). Square?
```

### Puzzle 2: Symmetry and Negation

If (x, y) is on the curve, so is (x, -y mod p). The **negation** of a point P = (x, y) is -P = (x, p - y).

```
-(7, 3) = (7, ?)
-(6, 5) = (6, ?)
-(5, 0) = (5, ?)    ← What happens when y = 0?
P + (-P) = ?
```

### Puzzle 3: Counting Points

Find all points on y² = x³ + 7 over GF(11):

```
x=2: points?
x=5: points?
x=7: points?
Total finite points: ?
Including O (point at infinity): ?   ← This is the group order!
```

**Hasse's Theorem** bounds the count: |N - (p+1)| ≤ 2√p. For p = 11, the number of points must be between 5 and 19.

---

## Section 2: Point Addition

The group operation on an elliptic curve is **point addition**. Geometrically: draw a line through P and Q, find the third intersection with the curve, reflect over the x-axis.

**Adding distinct points** P = (x₁, y₁) and Q = (x₂, y₂):
```
λ = (y₂ - y₁) / (x₂ - x₁)   mod p
x₃ = λ² - x₁ - x₂            mod p
y₃ = λ(x₁ - x₃) - y₁         mod p
```

**Doubling** P = (x₁, y₁) (tangent line):
```
λ = (3x₁² + a) / (2y₁)       mod p
x₃ = λ² - 2x₁                mod p
y₃ = λ(x₁ - x₃) - y₁         mod p
```

All "division" is multiplication by the modular inverse, just like we practiced in Module 2.

### Puzzle 4: Adding Two Distinct Points

Compute (7,3) + (6,5) on y² = x³ + 7 over GF(11):

```
y₂ - y₁ = 5 - 3 = ?
x₂ - x₁ = 6 - 7 = ? (mod 11)
(x₂ - x₁)⁻¹ mod 11 = ?
λ = (y₂-y₁) × (x₂-x₁)⁻¹ = ?
x₃ = λ² - x₁ - x₂ mod 11 = ?
y₃ = λ(x₁ - x₃) - y₁ mod 11 = ?
```

### Puzzle 5: Point Doubling

Double G = (7,3) on y² = x³ + 7 (a = 0):

```
3x₁² + a = 3(49) + 0 mod 11 = ?
2y₁ = 2(3) mod 11 = ?
(2y₁)⁻¹ mod 11 = ?
λ = ?
x₃ = λ² - 2(7) mod 11 = ?
y₃ = λ(7 - x₃) - 3 mod 11 = ?
```

### Puzzle 6: Verify Consistency

Check that the group operation is consistent:

```
1G = ?
2G = ?
3G = 2G + G = ?   (should match Puzzle 4)
-3G = -(2,9) = ?
9G = ?             (should equal -3G)
3G + 9G = ?        (should equal O)
```

---

## Section 3: Scalar Multiplication

**Scalar multiplication** kG means adding G to itself k times. This is the EC analogue of modular exponentiation (g^k mod p).

### Puzzle 7: Scalar Multiplication Table

Fill in key entries. The full table:
```
1G=(7,3)  2G=(6,5)  3G=(2,9)  4G=(3,1)  5G=(4,4)  6G=(5,0)
7G=(4,7)  8G=(3,10) 9G=(2,2)  10G=(6,6) 11G=(7,8) 12G=O
```

```
1G = ?    2G = ?    3G = ?
6G = ?    11G = ?   12G = ?
```

### Puzzle 8: Double-and-Add Algorithm

Compute 9G efficiently using double-and-add. 9 in binary = 1001₂.

```
9 in binary = ?
Start: acc = G = (7,3)
Process bit 0: double → 2G = ?
Process bit 0: double → 4G = ?
Process bit 1: double → 8G, then add G → 9G = ?
```

How many operations? Compare to 8 naive additions. For a 256-bit key?

### Puzzle 9: Order and Wraparound

Group order n = 12 means 12G = O. Scalar multiplication wraps around:

```
12G = ?
13G = ?   (hint: 13 = 12 + 1)
100G: 100 mod 12 = ?  →  100G = ?
Valid private key range: [1, ?]
```

---

## Section 4: The EC Discrete Log Problem

The **ECDLP**: given G and Q = kG, find k.

Forward (scalar multiplication) is efficient: O(log k) via double-and-add.
Backward (discrete log) has no known efficient algorithm.

### Puzzle 10: Forward Easy, Backward Hard

```
Compute 5G:           easy or hard?
Given Q=(3,10), find k: easy or hard?  (What is k?)
```

### Puzzle 11: Key Sizes Compared

The best attack on ECDLP is Pollard's rho: O(√n) steps.

```
256-bit curve → 2^? steps to break
Security level of 256-bit EC key: ?-bit
RSA/DH key for same security: ?-bit
Ratio: ?×
```

### Puzzle 12: secp256k1 Parameters

The curve used by Ethereum and Bitcoin:

```
Equation: y² = x³ + ?x + ?
Field prime p = 2²⁵⁶ - 2³² - ?
Is the group order n prime?
Why does prime order matter?
```

---

## Section 5: ECDSA and Ethereum

**ECDSA** (Elliptic Curve Digital Signature Algorithm) is how Ethereum authenticates every transaction. We switch to a smaller curve with **prime group order** (required for ECDSA):

**Curve**: y² = x³ + x + 6 over GF(7), group order n = 11, generator G = (1, 1).

### ECDSA Signing

Given: hash z, private key d, random nonce k.

1. Compute R = kG
2. r = R.x mod n
3. s = k⁻¹(z + r·d) mod n
4. Signature = (r, s)

### Puzzle 13: ECDSA Signing

Sign hash z = 5 with private key d = 3, nonce k = 7.

```
R = kG = 7G = ?
r = R.x = ?
k⁻¹ mod 11 = ?
z + r×d mod 11 = ?
s = k⁻¹(z + rd) mod 11 = ?
Signature (r, s) = ?
```

### ECDSA Verification

Given: hash z, signature (r, s), public key Q = dG.

1. w = s⁻¹ mod n
2. u₁ = z·w mod n
3. u₂ = r·w mod n
4. Compute u₁G + u₂Q
5. Check: x-coordinate = r?

### Puzzle 14: ECDSA Verification

Verify (r,s) = (4,4) on hash z = 5 with public key Q = 3G = (6,5):

```
w = s⁻¹ mod 11 = ?
u₁ = z×w mod 11 = ?
u₂ = r×w mod 11 = ?
u₁G = ?G = ?
u₂Q = ?×Q = ?
u₁G + u₂Q = ?   → x-coordinate = r?
```

### Puzzle 15: Private Key to Ethereum Address

The complete flow:

```
Step 1: Random private key k ∈ [1, n-1]. Bits: ?
Step 2: Public key Q = kG. Operation: ?
Step 3: Hash with keccak256. Output: ? bytes
Step 4: Take last ? bytes → address
Address length in hex: ? characters
What does ecrecover return?
```

Every ETH transfer, every smart contract call, every DeFi transaction follows this exact sequence.

---

## What You've Learned

You can now trace the complete path from mathematical foundations to Ethereum transactions:

- **Module 0**: Logic, sets, functions — the language
- **Module 1**: Modular arithmetic — the computation
- **Module 2**: Groups and fields — the structure
- **Module 3**: Elliptic curves — the application

The math inside `eth.accounts.sign()` is exactly what you just did by hand:
1. Pick private key d (random 256-bit number)
2. Compute public key Q = dG (scalar multiplication on secp256k1)
3. Hash the transaction (keccak256)
4. Sign with ECDSA (nonce, point multiplication, modular inverse)
5. Output (v, r, s) — recoverable signature

The security of your ETH, your NFTs, your DeFi positions — it all rests on the ECDLP being hard. And now you understand exactly what "hard" means.

---

*Crypto Math for Engineers — Module 3: Elliptic Curves*
*The math inside every Ethereum transaction.*

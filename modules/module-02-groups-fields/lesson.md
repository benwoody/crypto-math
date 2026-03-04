# Module 2: Groups & Fields

*Algebraic structures that make cryptography possible.*

---

## How This Works

In Module 1, you did modular arithmetic — inverses, Fermat's theorem, prime fields. Now we formalize *why* those things work by introducing **groups** and **fields**: the algebraic structures underneath all of public-key cryptography.

By the end of this module, you'll understand:
- Why generators are critical for Diffie-Hellman security
- Why Lagrange's Theorem constrains all of modular arithmetic
- Why elliptic curves provide better security per bit than RSA

Every concept connects directly to the cryptographic systems you'll build on in Module 3.

---

## Section 1: What Is a Group?

A **group** is a set G with an operation · satisfying four axioms:

1. **Closure**: For all a, b ∈ G, a · b ∈ G
2. **Associativity**: (a · b) · c = a · (b · c)
3. **Identity**: There exists e ∈ G such that a · e = e · a = a
4. **Inverses**: For each a ∈ G, there exists a⁻¹ such that a · a⁻¹ = e

That's it. Four rules. Every cryptographic system you've encountered — RSA, DH, ECDSA — operates inside a group.

### Puzzle 1: Checking Group Axioms

Verify that (ℤ/7ℤ, +) = ({0,1,2,3,4,5,6}, addition mod 7) satisfies all four axioms:

```
Closure: (3 + 5) mod 7 = ?   Is the result in {0,...,6}?
Identity: What element e satisfies a + e = a for all a?
Inverses: What is the additive inverse of 3?  (3 + ? ≡ 0 mod 7)
Associativity: (2+3)+4 mod 7 = ?   2+(3+4) mod 7 = ?   Same?
```

### Puzzle 2: Multiplicative Groups

Now consider (ℤ/7ℤ)* = {1,2,3,4,5,6} under multiplication mod 7:

```
Identity element: ?
Inverse of 3: ? (3 × ? ≡ 1 mod 7)
Inverse of 6: ?
How many elements (group order): ?
```

Bonus: Why doesn't mod 6 work? Compute 2 × 3 mod 6. Does 2 have an inverse mod 6?

### Puzzle 3: Not Everything Is a Group

Classify each — group or not?

```
a) ({0,1,2,3,4,5,6}, ×) mod 7 — group?  Why or why not?
b) ({1,2,3,4,5,6}, ×) mod 7 — group?
c) ({0,1,2,3,4,5,6}, +) mod 7 — group?
d) For any prime p, the order of (ℤ/pℤ)* = ?
```

---

## Section 2: Cyclic Groups and Generators

A group is **cyclic** if every element can be written as a power of a single element — the **generator**. Cyclic groups are the heart of Diffie-Hellman and discrete-log-based cryptography.

### Puzzle 4: Powers of a Generator

Compute all powers of 3 in (ℤ/7ℤ)*:

```
3¹ mod 7 = ?
3² mod 7 = ?
3³ mod 7 = ?
3⁴ mod 7 = ?
3⁵ mod 7 = ?
3⁶ mod 7 = ?
```

Do you visit all 6 elements? If so, 3 is a **generator** of (ℤ/7ℤ)*.

### Puzzle 5: Not Every Element Generates

Now try 2:

```
2¹ mod 7 = ?
2² mod 7 = ?
2³ mod 7 = ?
```

How many elements did you visit? What is the order of 2? Is 2 a generator?

If a Diffie-Hellman system uses a non-generator, the shared secret comes from a smaller set. Security is reduced.

### Puzzle 6: Generators of (ℤ/23ℤ)*

Test g=5 in the group of order 22:

```
5¹ mod 23 = ?
5² mod 23 = ?
5¹¹ mod 23 = ?
5²² mod 23 = ?
```

Quick generator test: if g^(n/q) ≢ 1 for every prime factor q of n, then g is a generator. Check 5¹¹ mod 23 — is it 1?

How many generators exist? φ(22) = ?

---

## Section 3: Group Order and Lagrange's Theorem

**Lagrange's Theorem**: The order of any element divides the order of the group.

This single theorem explains why:
- In (ℤ/7ℤ)* (order 6), element orders can only be 1, 2, 3, or 6
- Fermat's Little Theorem works (p-1 is the group order)
- Subgroup attacks have specific constraints

### Puzzle 7: Subgroup Orders

Find the order of each element in (ℤ/7ℤ)*:

```
Order of 1: ?    (1ᵏ = 1 for k = ?)
Order of 2: ?    (2¹=2, 2²=4, 2³=?)
Order of 3: ?    (generator — visits all 6)
Order of 4: ?
Order of 5: ?
Order of 6: ?
```

All should divide 6. Can any element have order 4?

### Puzzle 8: Lagrange in (ℤ/23ℤ)*

The group has order 22. What are the divisors of 22?

```
Divisors of 22 = ?
Order of element 22 (≡ -1 mod 23): ?
Order of element 2: ?
Can any element have order 7?
```

### Puzzle 9: Why Lagrange Matters

```
Fermat's Little Theorem: a^(p-1) ≡ 1. What is the group order of (ℤ/pℤ)*?
Euler's Theorem: a^φ(n) ≡ 1. What is the group order of (ℤ/nℤ)*?
Lagrange says ord(a) | |G|, so a^|G| ≡ ?
Are Fermat and Euler special cases of Lagrange?
```

---

## Section 4: Field Axioms Formalized

A **field** is a set with two operations (+ and ×) where:
- (F, +) is a commutative group with identity 0
- (F\{0}, ×) is a commutative group with identity 1
- Distributive law: a × (b + c) = a×b + a×c

You've been working in fields all along — now you know the formal definition.

### Puzzle 10: Two Groups in One

ℤ/7ℤ contains two group structures:

```
Additive group: order = ?    identity = ?
Multiplicative group: order = ?    identity = ?
Additive inverse of 3: ?
Multiplicative inverse of 3: ?
```

Why is 0 excluded from the multiplicative group?

### Puzzle 11: Fields vs Not-Fields

Classify each:

```
ℤ/5ℤ: field or not?
ℤ/6ℤ: field or not?
ℤ/2ℤ: field or not?
Integers ℤ: field or not?
Rationals ℚ: field or not?
```

When is ℤ/nℤ a field?

### Puzzle 12: Field Arithmetic in GF(11)

Practice in GF(11) — the same type of field underlying secp256k1:

```
7 + 8 mod 11 = ?
7 × 8 mod 11 = ?
3⁻¹ mod 11 = ?
"5 ÷ 3" = 5 × 3⁻¹ mod 11 = ?
```

Verify: does 3 × (your answer) = 5 mod 11?

---

## Section 5: Groups in Cryptographic Protocols

Everything from this module — generators, Lagrange, fields — directly determines the security of real protocols. Let's see how.

### Puzzle 13: DH Revisited with Group Theory

Diffie-Hellman in (ℤ/23ℤ)* using generator g=5. Alice picks a=4, Bob picks b=3.

```
Alice sends A = 5⁴ mod 23 = ?
Bob sends B = 5³ mod 23 = ?
Alice computes: B^a mod 23 = ?
Bob computes: A^b mod 23 = ?
```

Both should get the same shared secret. Why did we use g=5 instead of g=2?

### Puzzle 14: Subgroup Attacks

Compare g=5 (order 22) vs g=2 (order 11) in (ℤ/23ℤ)*:

```
With g=5: how many possible shared secrets?
With g=2: how many possible shared secrets?
Security reduction factor: ?
```

Can an attacker detect which subgroup you're in?

### Puzzle 15: Bridge to Elliptic Curves

Side-by-side comparison:

```
(ℤ/pℤ)* operation: ?          EC operation: ?
(ℤ/pℤ)* identity: ?           EC identity: ?
(ℤ/pℤ)* DLP: find x in g^x   EC DLP: find k in kG
```

For 128-bit security: DH needs ? bits, EC needs ? bits.

Same group axioms, same discrete log hardness, but elliptic curves achieve the same security with dramatically smaller keys. That's where we're headed in Module 3.

---

## What's Next

You now understand the algebraic structures that make cryptography work:

- **Groups** — the minimum structure needed for one-way functions
- **Cyclic groups and generators** — why DH parameters must be chosen carefully
- **Lagrange's Theorem** — the master theorem that explains Fermat, Euler, and subgroup attacks
- **Fields** — the two-group structure underlying elliptic curve arithmetic
- **Security implications** — generators, subgroup attacks, and the EC advantage

In Module 3, we move to **elliptic curves** — a different group with the same axioms but dramatically better security properties. You'll do point addition, scalar multiplication, and ECDSA signing by hand, using the same math that secures every Ethereum transaction.

---

*Crypto Math for Engineers — Module 2: Groups & Fields*
*The algebraic structures underneath RSA, Diffie-Hellman, and elliptic curves.*

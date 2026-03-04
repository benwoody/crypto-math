# Module 1: Modular Arithmetic

*Inverses, primes, and the finite fields that power all of public-key cryptography.*

---

## How This Works

This module takes the modular arithmetic you tasted in Module 0 and goes deep. By the end, you'll understand why RSA works, how Diffie-Hellman creates shared secrets, and why the discrete log problem makes all of it secure.

Every section connects directly to real cryptographic systems — RSA, PGP, Diffie-Hellman, TLS, SSH. This isn't abstract math for its own sake. It's the exact math running inside every secure connection on the internet.

Work through each section with pencil and paper. Then check your answers in the Solve tab.

---

## Section 1: GCD and the Euclidean Algorithm

Before we can talk about inverses, fields, or cryptography, we need one fundamental tool: the **Greatest Common Divisor (GCD)**.

### Why GCD Matters

The GCD of two numbers is the largest number that divides both of them. Simple concept, profound consequences:

- GCD(48, 18) = 6, because 6 is the largest number dividing both 48 and 18
- GCD(17, 5) = 1, because 17 and 5 share no common factors

When GCD(a, b) = 1, we say a and b are **coprime**. This single property — coprimality — determines whether a number has a modular inverse, which determines whether encryption and decryption can work.

### Puzzle 1: GCD by Hand

Find the GCD of each pair:

```
a) GCD(48, 18) = ?
b) GCD(17, 5) = ?
c) GCD(100, 35) = ?
d) GCD(13, 13) = ?
e) GCD(7, 1) = ?
```

### Puzzle 2: Coprime Pairs

Two numbers are coprime if their GCD is 1. Are these pairs coprime?

```
a) (15, 28)
b) (12, 9)
c) (35, 6)
d) (256, 7)
```

What does coprimality mean for encryption? Think about it — we'll make this precise in Section 2.

### Puzzle 3: The Euclidean Algorithm

Computing GCD by listing all factors works for small numbers, but cryptography uses numbers with hundreds of digits. The **Euclidean Algorithm** handles any size:

**Method:** Divide the larger by the smaller. Take the remainder. Repeat until the remainder is 0. The last nonzero remainder is the GCD.

Step through GCD(252, 105):

```
252 = 105 × ? + ?
105 =  42 × ? + ?
 42 =  21 × ? + ?
→ GCD = ?
```

And GCD(161, 28):

```
161 = 28 × ? + ?
 28 = 21 × ? + ?
 21 =  7 × ? + ?
→ GCD = ?
```

This algorithm — 2,300 years old, invented by Euclid — runs inside every RSA key generation, every TLS handshake, every PGP signature. When your browser establishes an HTTPS connection, the Euclidean Algorithm computes modular inverses behind the scenes.

---

## Section 2: Modular Inverses

In regular arithmetic, the inverse of 3 is 1/3 — multiply them and you get 1. In modular arithmetic, we need the same concept but without fractions.

### What Is a Modular Inverse?

The modular inverse of `a` mod `m` is a number `x` such that:

```
a × x ≡ 1 (mod m)
```

For example, the inverse of 3 mod 7 is 5, because `3 × 5 = 15 ≡ 1 (mod 7)`.

Not every number has an inverse. The rule: **a has an inverse mod m if and only if GCD(a, m) = 1**. This is where GCD connects to everything.

### Puzzle 4: Finding Inverses by Trial

Find x such that a × x ≡ 1 (mod m), or determine that no inverse exists:

```
a) 3⁻¹ mod 7 = ?     (find x where 3x ≡ 1 mod 7)
b) 5⁻¹ mod 11 = ?
c) 2⁻¹ mod 13 = ?
d) 6⁻¹ mod 10 = ?    (does it exist?)
```

### Puzzle 5: When Inverses Exist

Consider mod 12:

```
Which numbers from 1 to 11 have inverses mod 12?
What do those numbers have in common?
```

Now consider mod 13 (a prime):

```
How many numbers from 1 to 12 have inverses mod 13?
```

### Puzzle 6: Using Inverses to Solve Equations

If you know the inverse, you can solve modular equations — just multiply both sides by the inverse:

```
3x ≡ 5 (mod 7)
→ multiply both sides by 3⁻¹
→ x ≡ 3⁻¹ × 5 (mod 7)
```

Solve:

```
a) 3⁻¹ mod 7 = ?
b) 3x ≡ 5 (mod 7) → x = ?
c) 5⁻¹ mod 11 = ?
d) 5x ≡ 3 (mod 11) → x = ?
```

**RSA decryption is exactly this operation.** Encryption computes `m^e mod n`. Decryption "divides" by multiplying with the inverse exponent. "Multiply by the inverse" is the entire mechanism of public-key decryption.

---

## Section 3: Fermat, Euler, and Totients

Now for the theorems that let you compute with impossibly large numbers — the engine behind RSA.

### Euler's Totient Function φ(n)

φ(n) counts how many numbers from 1 to n are coprime to n:

- φ(7) = 6 — since 7 is prime, every number 1-6 is coprime to it
- φ(10) = 4 — only 1, 3, 7, 9 are coprime to 10

### Puzzle 7: Euler's Totient

Calculate:

```
a) φ(7) = ?
b) φ(10) = ?
c) φ(12) = ?
d) φ(15) = ?
e) φ(13) = ?
```

Bonus — spot the patterns:

```
f) When p is prime, φ(p) = ?
g) When p and q are distinct primes, φ(p × q) = ?
```

That second formula is the one RSA uses.

### Fermat's Little Theorem

If p is prime and a is not divisible by p:

```
a^(p-1) ≡ 1 (mod p)
```

This means modular exponentiation cycles. And if it cycles, you can reduce enormous exponents.

### Puzzle 8: Fermat's Little Theorem

Verify the theorem:

```
a) 2^6 mod 7 = ?    (should be 1, since 7 is prime)
b) 3^6 mod 7 = ?
c) 5^10 mod 11 = ?  (should be 1, since 11 is prime)
```

Now use it to compute huge powers:

```
d) 3^100 mod 7: first compute 100 mod 6 = ?
e) So 3^100 ≡ 3^? (mod 7)
f) Therefore 3^100 mod 7 = ?

g) 2^1000 mod 11: first compute 1000 mod 10 = ?
h) Therefore 2^1000 mod 11 = ?
```

This is how PGP and RSA handle 2048-bit exponents — the exponent cycles, so you only need to know where you are in the cycle.

### Euler's Theorem (Generalization)

For any n (not just primes), if GCD(a, n) = 1:

```
a^φ(n) ≡ 1 (mod n)
```

### Puzzle 9: Euler's Theorem

```
a) φ(10) = ?
b) 3^φ(10) mod 10 = 3^? mod 10
c) 3^4 mod 10 = ?
d) 7^4 mod 10 = ?
```

Bonus — the RSA connection:

```
e) In RSA, n = p×q. What is φ(n)?
f) RSA picks d so that e×d ≡ 1 (mod ?)
```

---

## Section 4: Prime Fields

A **field** is a number system where you can add, subtract, multiply, and divide (by nonzero elements). The integers mod a prime form a field — the algebraic structure underneath both RSA and elliptic curve cryptography.

### Puzzle 10: Arithmetic in ℤ/7ℤ

Do all arithmetic mod 7:

```
a) 3 + 5 = ?
b) 4 × 6 = ?
c) 2 + 6 = ?
d) 5 × 3 = ?
```

Bonus — find all inverses:

```
1⁻¹ = ?    2⁻¹ = ?    3⁻¹ = ?
4⁻¹ = ?    5⁻¹ = ?    6⁻¹ = ?
```

Every nonzero element should have one.

### Puzzle 11: Why Primes?

Compare mod 6 (composite) vs mod 7 (prime):

```
Mod 6:
a) Does 2 have an inverse?
b) Does 3 have an inverse?
c) Does 5 have an inverse?
d) What is 2 × 3 mod 6?

Mod 7:
e) Can you find a,b ≠ 0 where a × b ≡ 0 (mod 7)?
```

That result in (d) is called a **zero divisor** — two nonzero numbers that multiply to zero. Zero divisors break everything. They make "division" inconsistent and cryptography impossible.

Prime moduli never have zero divisors. That's why every cryptographic system uses primes.

### Puzzle 12: Field Properties

Verify that ℤ/7ℤ satisfies the field axioms:

**Associativity:**
```
a) (2 + 3) + 4 mod 7 = ?
b) 2 + (3 + 4) mod 7 = ?    (should match)
```

**Commutativity:**
```
c) 3 × 5 mod 7 = ?
d) 5 × 3 mod 7 = ?           (should match)
```

**Distributive law:**
```
e) 2 × (3 + 4) mod 7 = ?
f) (2×3 + 2×4) mod 7 = ?     (should match)
```

These properties aren't just nice — they're requirements. Elliptic curve point addition works because the underlying field has these properties. RSA's math is consistent because of them.

---

## Section 5: Cryptography Connections

Everything you've learned in this module — GCDs, inverses, totients, Fermat's theorem, prime fields — comes together in real cryptographic systems. Let's see it in action.

### Puzzle 13: RSA Key Generation

Walk through RSA with small primes p=5, q=11:

```
a) n = p × q = ?
b) φ(n) = (p-1)(q-1) = ?
c) Choose e = 3. Is GCD(3, φ(n)) = 1?
d) Find d = e⁻¹ mod φ(n) = 3⁻¹ mod 40 = ?
```

Now encrypt and decrypt message m = 2:

```
e) Encrypt: c = m^e mod n = 2^3 mod 55 = ?
f) Decrypt: m = c^d mod n = 8^27 mod 55 = ?
```

If decryption gives back 2, you've just done RSA by hand.

### Puzzle 14: Diffie-Hellman Key Exchange

Public parameters: g=2, p=23. Alice picks secret a=6, Bob picks secret b=15.

```
a) Alice sends: A = g^a mod p = 2^6 mod 23 = ?
b) Bob sends: B = g^b mod p = 2^15 mod 23 = ?
c) Alice computes shared secret: B^a mod p = ?
d) Bob computes shared secret: A^b mod p = ?
```

Do Alice and Bob get the same number? An eavesdropper sees g, p, A, and B — but not a or b. Can they compute the shared secret?

### Puzzle 15: The Discrete Log Problem

Forward direction (easy — just compute):

```
a) 2^x ≡ 8 (mod 23) → x = ?
```

Reverse direction (hard — have to search):

```
b) 2^x ≡ 18 (mod 23) → x = ?
c) 2^x ≡ 13 (mod 23) → x = ?
```

Feel the asymmetry:

```
d) Compute 2^17 mod 23 = ?     (easy or hard?)
e) Find x: 2^x ≡ 12 (mod 23)  (easy or hard?)
```

This asymmetry — forward is easy, reverse is hard — is the foundation of all public-key cryptography. RSA, Diffie-Hellman, DSA, ECDSA, and every elliptic curve system exploit a version of this one-way trapdoor.

---

## What's Next

You now have the mathematical foundation for all of public-key cryptography. You understand:

- **GCD and coprimality** — the gatekeeper of modular inverses
- **Modular inverses** — how "division" works in finite systems
- **Fermat and Euler's theorems** — how to compute with impossibly large exponents
- **Prime fields** — the complete arithmetic system underneath RSA and elliptic curves
- **The discrete log problem** — the one-way trapdoor that makes public keys possible

In Module 2, we'll formalize these ideas into **groups and fields** — the algebraic structures that let us define elliptic curves. The jump from modular arithmetic to elliptic curves is smaller than you think: it's the same field axioms, just with a different operation.

---

*Crypto Math for Engineers — Module 1: Modular Arithmetic*
*The math inside every RSA key, every TLS handshake, every PGP signature.*

# Module 0: Where Are You?

*A foundation check for engineers who use logic daily but haven't done "math" in a while.*

---

## How This Works

This isn't a test. There's no grade, no pass/fail. It's a map — it figures out what you already know (probably more than you think) and what needs a refresh before we dive into the real crypto math in Module 1.

Work through each section in order. Grab a piece of paper or open a notes app. Do the problems by hand — no calculator unless the section says otherwise. When you're done with a section, open the companion web page and check your answers. It'll tell you if you're solid or if you should spend more time before moving on.

**Be honest with yourself.** If something feels shaky, that's useful information, not a failure. The whole point is to build a foundation you trust.

---

## Section 1: Numbers and Their Personalities

Before we can do anything with math, you need to be comfortable with how numbers behave. Not in a "recite the rules" way, but in an intuitive "I know what's going to happen" way.

### The Basics You Already Know (Probably)

You use these every day as an engineer, even if you don't think of it as math:

- **Integers**: whole numbers, positive and negative. Array indices, loop counters, block numbers.
- **Zero**: not nothing — it's an identity element (any number + 0 = that number). This concept comes back in a big way later.
- **Negative numbers**: you've dealt with these in offset calculations, timezone math, coordinate systems.

### Puzzle 1: Negative Division

Here's where it gets interesting. What is:

```
  17 ÷ 5 = ?  (give the quotient AND the remainder)
 -17 ÷ 5 = ?  (give the quotient AND the remainder)
  17 ÷ -5 = ? (give the quotient AND the remainder)
```

Don't overthink it. Write down what you think the answer is, then we'll discuss.

The reason this matters: **remainders are the entire foundation of modular arithmetic**, which is the entire foundation of cryptography. If you're solid on how remainders work — even with negative numbers — you're already halfway to understanding finite fields.

### Puzzle 2: Big Numbers, No Calculator

You won't need to do this by hand in real life, but it builds intuition for how numbers scale. Estimate (don't calculate exactly):

```
a) Is 2^10 closer to 1,000 or 10,000?
b) Is 2^20 closer to 100,000 or 1,000,000?
c) Is 2^256 a number with roughly how many digits?
   Hint: 2^10 ≈ 1,000 which has 4 digits
```

That last one matters because **every key, every hash, every coordinate on P-256 is a 256-bit number**. Having a feel for how absurdly large that is helps you understand why the math is secure.

### Puzzle 3: What Happens at the Edges?

Answer these without looking anything up:

```
a) What is 0 × anything?
b) What is anything ÷ 0?
c) What is 0^0?  (this one is tricky — what's your instinct?)
d) What is anything^0?  (as long as it's not zero)
```

These "edge cases" — sound familiar? — show up constantly in cryptographic math. Division by zero isn't just an error in programming; it's a fundamental impossibility that shapes how we build mathematical systems.

---

## Section 2: The Remainder Is the Point

In school, they taught you that 17 ÷ 5 = 3.4 and the decimal is the answer. In cryptography, the **remainder** is the answer and the quotient is garbage we throw away.

### A Different Way to Think About Division

```
17 ÷ 5 = 3 remainder 2
```

This means: 5 goes into 17 three times (5 × 3 = 15), with 2 left over.

We write this as: **17 mod 5 = 2**

That's it. That's modular arithmetic. Everything else builds on this.

### Puzzle 4: Mod Practice

Calculate these by hand:

```
a) 23 mod 7 = ?
b) 100 mod 10 = ?
c) 13 mod 13 = ?
d) 7 mod 13 = ?
e) 256 mod 16 = ?
f) 1 mod anything = ?  (what's the pattern?)
```

Pay attention to (c) and (d) — what happens when the number equals the modulus? What about when it's smaller?

### Puzzle 5: Clock Math

You already do modular arithmetic every day. If it's 10:00 AM and you add 5 hours, it's 3:00 PM — not 15:00 (well, in 12-hour time).

```
10 + 5 = 15, but on a clock: 15 mod 12 = 3
```

Now try these (assume a 12-hour clock starting at 0):

```
a) It's 9 o'clock. What time is it in 8 hours?
b) It's 3 o'clock. What time was it 7 hours ago?
c) It's midnight (0). What time is it in 25 hours?
d) It's midnight (0). What time is it in 1,000,000 hours?
```

That last one is the key insight: **no matter how big the input number is, the output is always between 0 and 11**. The modulus (12) creates a finite world. In cryptography, instead of 12 we use enormous prime numbers, but the principle is identical.

### Puzzle 6: Why Mods "Wrap"

Think about Ethereum addresses. They're 20 bytes, which is 160 bits. When you hash something with keccak256, you get 256 bits, but an address only uses the last 20 bytes.

```
address = keccak256(publicKey) mod 2^160
```

That's mod in action — taking a huge number and wrapping it into a fixed range. Now:

```
a) If you mod by 10, what are all the possible results?
b) If you mod by 256, what are all the possible results?
c) If you mod by 2, what are all the possible results?
d) What does modding by 2 actually tell you about a number?
```

---

## Section 3: Exponents and Why They Matter

Exponents are where cryptographic security lives. The entire reason public-key cryptography works is that exponentiation is easy in one direction and impossibly hard to reverse.

### Quick Refresher

```
2^1 = 2
2^2 = 2 × 2 = 4
2^3 = 2 × 2 × 2 = 8
2^4 = 2 × 2 × 2 × 2 = 16
```

The exponent tells you how many times to multiply the base by itself.

### Puzzle 7: Exponent Intuition

Without a calculator:

```
a) 3^3 = ?
b) 5^3 = ?
c) 10^4 = ?
d) 2^8 = ?  (you probably know this one as an engineer)
e) 2^16 = ? (and this one)
```

### Puzzle 8: The Exponent Rules

These come back constantly. Fill in the blanks:

```
a) 2^3 × 2^4 = 2^?       (multiplying same base)
b) (2^3)^4 = 2^?          (exponent of an exponent)
c) 2^10 ÷ 2^3 = 2^?      (dividing same base)
d) 5^0 = ?                (anything to the zero power)
e) 2^-1 = ?               (negative exponent means what?)
```

### Puzzle 9: Exponents Meet Mod

Here's where it gets interesting. Calculate:

```
a) 2^4 mod 5 = ?     (calculate 2^4 first, then mod)
b) 3^3 mod 7 = ?
c) 2^10 mod 7 = ?    (2^10 = 1024, then mod 7)
d) 5^3 mod 13 = ?
```

Now here's the magic question:

```
e) 2^256 mod 7 = ?
```

You obviously can't calculate 2^256 directly — it's a 77-digit number. But there's a pattern. Go back and calculate:

```
2^1 mod 7 = ?
2^2 mod 7 = ?
2^3 mod 7 = ?
2^4 mod 7 = ?
2^5 mod 7 = ?
2^6 mod 7 = ?
2^7 mod 7 = ?
```

Do you see it cycling? That's not a coincidence. That pattern is called **Fermat's Little Theorem** and it's one of the fundamental tools in cryptography. We'll dig into it properly in Module 2, but the fact that modular exponentiation has repeating cycles is why we can work with 256-bit numbers without our computers catching fire.

---

## Section 4: Variables and Solving

You do this every time you debug code — "if this function returned 42, and I know it multiplies the input by 6, what was the input?" That's solving for x.

### Puzzle 10: Solve These

Find x:

```
a) x + 7 = 15
b) 3x = 21
c) x - 12 = -4
d) x/4 = 8
e) 2x + 3 = 17
f) 5(x - 2) = 30
```

### Puzzle 11: Substitution

If a = 3 and b = 5, what is:

```
a) a + b = ?
b) a × b = ?
c) a^b = ?   (3 to the 5th power)
d) b^a = ?   (5 to the 3rd power)
e) (a + b) mod 4 = ?
f) (a × b) mod 7 = ?
g) (a^b) mod 7 = ?
```

This is exactly what happens in cryptographic formulas — you substitute actual values into abstract equations. The ECDSA verification algorithm is just a series of substitutions and operations, no different from what you just did.

---

## Section 5: Evenness, Oddness, and Divisibility

These concepts feel basic but they're the gateway to understanding primes, which are the gateway to understanding fields, which are the gateway to understanding elliptic curves.

### Puzzle 12: Quick Checks

Without calculating, answer:

```
a) Is 2,347 even or odd?
b) Is 1,000,000 even or odd?
c) Is the sum of two odd numbers even or odd?
d) Is the sum of an even and an odd number even or odd?
e) Is the product of any number and an even number even or odd?
```

### Puzzle 13: Divisibility

A number is "divisible by" another if the remainder is zero (mod = 0).

```
a) Is 144 divisible by 12?
b) Is 100 divisible by 7?
c) Is 2^10 (1024) divisible by 8?
d) Name three numbers that are divisible by both 3 AND 5
e) What's the smallest number divisible by 1, 2, 3, 4, 5, and 6?
```

### Puzzle 14: Primes

A prime number is only divisible by 1 and itself.

```
a) Is 17 prime?
b) Is 51 prime? (careful — check if 3 divides it)
c) Is 97 prime?
d) Why is 1 not considered prime?
e) Why is 2 special among primes?
```

Primes matter because **every finite field used in cryptography is built on a prime number**. The P-256 curve uses a specific 256-bit prime. Ethereum's secp256k1 uses a different one. The security of the entire system rests on properties of these primes.

---

## Section 6: Binary and Hex

You probably know this already as an engineer, but let's make sure the foundation is solid because we'll be moving between representations constantly.

### Puzzle 15: Binary

```
a) What is 13 in binary?
b) What is 1011 (binary) in decimal?
c) What is 255 in binary?
d) Why is 255 significant? (think bytes)
e) How many values can 8 bits represent?
f) How many values can 256 bits represent?
```

### Puzzle 16: Hex

```
a) What is 255 in hex?
b) What is 0x1A in decimal?
c) What is 0xFF in binary?
d) How many hex digits do you need for a 256-bit number?
e) An Ethereum address is 20 bytes — how many hex characters is that?
```

### Puzzle 17: Connecting It

```
a) A byte can hold values 0 to 255. What is 255 in mod terms?
   (hint: 255 = 2^? - 1)
b) When a uint8 in Solidity overflows past 255, what happens?
   What mod operation is happening?
c) A uint256 in Solidity can hold values from 0 to 2^256 - 1.
   Solidity arithmetic is essentially math mod what number?
```

This is the connection — **Solidity's integer arithmetic IS modular arithmetic**. You've been doing this math the entire time you've been writing smart contracts. You just didn't have the vocabulary for it.

---

## How Did It Go?

Open the companion web page (`module-00-checker.html`) to check your answers and see where you stand. It'll give you an honest assessment of each section and tell you whether you're ready for Module 1 or if there are spots to shore up first.

Don't stress about getting everything right. The point is to know where you are. Some of these problems are intentionally tricky because they test intuition, not memorization.

**What's coming in Module 1:** We take modular arithmetic — which you just got a taste of — and go deep. You'll learn why certain numbers have "inverses" and others don't, why primes are magical for creating mathematical systems, and how all of this connects to real ECDSA signatures. It's the same concepts from this module, but with the volume turned up.

---

*Crypto Math for Engineers — Module 0: Foundations*
*Crypto Math for Engineers. Not a textbook. Not a course. A workshop.*

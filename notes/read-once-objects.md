---
title: Read-Once Objects
tags:
  - AppSec
  - Books
emoji: 📕
link:
---

This concept comes from a book I really enjoyed reading last year, [Secure by Design](https://www.amazon.com/gp/product/1617294357/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1617294357&linkCode=as2&tag=joemerante-20&linkId=fcf392fba69449c44920daf2383d12d2). The authors suggest using a "read-once object" to represent sensitive values to avoid unintentional use or data leakage. A read-once objects has the following properties -

1. Its main purpose is to facilitate detection of unintentional use
2. It represents a sensitive value or concept
3. It's often a domain primitive
4. Its value can be read once, and once only
5. It prevents serialization of sensitive data
6. It prevents subclassing and extension

In the book, the authors start with the example of a `Password` domain primitive as a read-once object. If you're one of the brave readers of this note, you've likely seen a few passwords stored as strings on user objects. While there are plenty of benefits to the use of a domain primitive over a string (validations, unit testing, encapsulation), once you've read the password to compare it during authentication, there's no need to keep it around. While there are other ways of removing from memory or scrubbing logs, why bother? There's enough to remember as it is. 

The book provides additional examples and relies heavily on the value of DDD as a foundation for secure design throughout the book. There's a free chapter on the publisher's site [on domain primitives](https://freecontent.manning.com/domain-primitives-what-they-are-and-how-you-can-use-them-to-make-more-secure-software/).

I spotted this [repo](https://github.com/azu/read-once) putting the concept to practice in TypeScript. Maybe one day will get around to putting together some examples in other languages (or better yet, using the idea on a project). In Ruby, for example, I'd think about overriding `to_s` and `to_json`, maybe use object lifecycle callbacks to prevent subclassing, and clone and return a temporary value in the property getter. There's plenty more in [the book](https://www.amazon.com/gp/product/1617294357/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=1617294357&linkCode=as2&tag=joemerante-20&linkId=fcf392fba69449c44920daf2383d12d2), I'd highly recommend it.


----------------------------- MODULE MemoryPairs -----------------------------
EXTENDS Naturals, Sequences

VARIABLES cards, flipped

Init == 
  /\ cards = << [id |-> 1, value |-> "A", isFlipped |-> FALSE, isMatched |-> FALSE],
                 [id |-> 2, value |-> "A", isFlipped |-> FALSE, isMatched |-> FALSE] >>
  /\ flipped = << >>

FlipCard(id) ==
  /\ \E c \in cards : c.id = id /\ ~c.isFlipped /\ ~c.isMatched
  /\ cards' = [c \in cards |-> IF c.id = id THEN [c EXCEPT !.isFlipped = TRUE] ELSE c]
  /\ flipped' = Append(flipped, id)

CheckMatch ==
  /\ Len(flipped) = 2
  /\ LET c1 == SelectSeq(cards, LAMBDA c: c.id = flipped[1]) IN
     LET c2 == SelectSeq(cards, LAMBDA c: c.id = flipped[2]) IN
       IF c1.value = c2.value THEN
         cards' = [c \in cards |-> IF c.id = c1.id \/ c.id = c2.id THEN [c EXCEPT !.isMatched = TRUE] ELSE c]
       ELSE
         cards' = [c \in cards |-> IF c.id = c1.id \/ c.id = c2.id THEN [c EXCEPT !.isFlipped = FALSE] ELSE c]
  /\ flipped' = << >>

GameOver == \A c \in cards : c.isMatched

=============================================================================
\* This spec describes the Memory Pairs mechanic: flip two cards, check for a match, repeat until all pairs are found.

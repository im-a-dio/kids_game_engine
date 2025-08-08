----------------------------- MODULE MemoryFourInARow -----------------------------
EXTENDS Naturals, Sequences

VARIABLES cards, flipped

Init == 
  /\ cards = << [id |-> 1, value |-> "A", isFlipped |-> FALSE, isMatched |-> FALSE],
                 [id |-> 2, value |-> "A", isFlipped |-> FALSE, isMatched |-> FALSE],
                 [id |-> 3, value |-> "A", isFlipped |-> FALSE, isMatched |-> FALSE],
                 [id |-> 4, value |-> "A", isFlipped |-> FALSE, isMatched |-> FALSE] >>
  /\ flipped = << >>

FlipCard(id) ==
  /\ \E c \in cards : c.id = id /\ ~c.isFlipped /\ ~c.isMatched
  /\ cards' = [c \in cards |-> IF c.id = id THEN [c EXCEPT !.isFlipped = TRUE] ELSE c]
  /\ flipped' = Append(flipped, id)

CheckMatch ==
  /\ Len(flipped) = 4
  /\ LET c1 == SelectSeq(cards, LAMBDA c: c.id = flipped[1]) IN
     LET c2 == SelectSeq(cards, LAMBDA c: c.id = flipped[2]) IN
     LET c3 == SelectSeq(cards, LAMBDA c: c.id = flipped[3]) IN
     LET c4 == SelectSeq(cards, LAMBDA c: c.id = flipped[4]) IN
       IF c1.value = c2.value /\ c2.value = c3.value /\ c3.value = c4.value THEN
         cards' = [c \in cards |-> IF c.id = c1.id \/ c.id = c2.id \/ c.id = c3.id \/ c.id = c4.id THEN [c EXCEPT !.isMatched = TRUE] ELSE c]
       ELSE
         cards' = [c \in cards |-> IF c.id = c1.id \/ c.id = c2.id \/ c.id = c3.id \/ c.id = c4.id THEN [c EXCEPT !.isFlipped = FALSE] ELSE c]
  /\ flipped' = << >>

GameOver == \A c \in cards : c.isMatched

=============================================================================
\* This spec describes the Memory 4 in a Row mechanic: flip four cards, check for a match, repeat until all sets are found.

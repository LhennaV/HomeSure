-- ═════════════════════════════════════════════════════════════════════════════
-- 010_barangays_sta_maria.sql
--
-- The barangays table was filled in by hand and holds 30 rows. Sta. Maria, Bulacan has 24.
--
-- Nine of the rows belong to other municipalities (Lawa, Linya, Loke, Magaslaw, Pulong Yantok,
-- Santo Cristo, Santo Niño, Simbol, Tungkong Mangga), one is spelt without its space (Caypombo),
-- and three real barangays are missing entirely (Mag-asawang Sapa, Tabing Bakod, Tumana).
--
-- This matters in two places a panel can see:
--   • post-a-listing reads this table for its barangay dropdown, so a seller can currently file a
--     property under a barangay that is not in Sta. Maria — and the hero map, which draws only the
--     real 24, would never show that listing;
--   • the landing page counts this table, so it would claim "30 Barangays Covered".
--
-- Safe to re-run. It renames rather than deletes where it can, so existing barangay_id values
-- keep working, and it refuses to delete a row a listing still points at.
-- ═════════════════════════════════════════════════════════════════════════════

-- ── 1. The spelling the rest of the system uses ──────────────────────────────
-- A rename keeps id 7, so any listing already filed under it stays correct.
UPDATE barangays SET name = 'Cay Pombo' WHERE name = 'Caypombo';

-- ── 2. The three that were never there ───────────────────────────────────────
INSERT INTO barangays (name, municipality, province)
SELECT v.name, 'Santa Maria', 'Bulacan'
FROM (VALUES ('Mag-asawang Sapa'), ('Tabing Bakod'), ('Tumana')) AS v(name)
WHERE NOT EXISTS (SELECT 1 FROM barangays b WHERE b.name = v.name);

-- ── 3. The rows that belong to other municipalities ──────────────────────────
DO $$
DECLARE
  canonical text[] := ARRAY[
    'Bagbaguin','Balasing','Buenavista','Bulac','Camangyanan','Catmon',
    'Cay Pombo','Caysio','Guyong','Lalakhan','Mag-asawang Sapa',
    'Mahabang Parang','Manggahan','Parada','Poblacion','Pulong Buhangin',
    'San Gabriel','San Jose Patag','San Vicente','Santa Clara','Santa Cruz',
    'Silangan','Tabing Bakod','Tumana'
  ];
  still_used text;
BEGIN
  -- Deleting a row a listing points at would quietly blank that listing's location, so stop and
  -- name it instead. Whoever runs this can move the listing, then re-run.
  SELECT string_agg(DISTINCT b.name, ', ') INTO still_used
  FROM barangays b
  JOIN properties p ON p.barangay_id = b.id
  WHERE NOT (b.name = ANY(canonical));

  IF still_used IS NOT NULL THEN
    RAISE EXCEPTION
      'These barangays are not in Sta. Maria but listings still point at them: %. Move those listings to a real barangay first.',
      still_used;
  END IF;

  DELETE FROM barangays WHERE NOT (name = ANY(canonical));

  -- Every remaining row is a Sta. Maria barangay, so say so.
  UPDATE barangays
     SET municipality = 'Santa Maria', province = 'Bulacan'
   WHERE municipality IS DISTINCT FROM 'Santa Maria'
      OR province IS DISTINCT FROM 'Bulacan';
END $$;

-- ── 4. Stop it drifting again ────────────────────────────────────────────────
-- Without this, "Poblacion" can be added a second time and the dropdown shows it twice.
CREATE UNIQUE INDEX IF NOT EXISTS barangays_name_key ON barangays (name);

-- ── 5. Say plainly whether it worked ─────────────────────────────────────────
DO $$
DECLARE n integer;
BEGIN
  SELECT count(*) INTO n FROM barangays;
  IF n <> 24 THEN
    RAISE EXCEPTION 'Expected 24 barangays after this migration, found %.', n;
  END IF;
  RAISE NOTICE 'barangays: 24 rows, matching Sta. Maria, Bulacan.';
END $$;

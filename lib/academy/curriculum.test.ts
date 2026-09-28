import { describe, expect, it } from "vitest";
import { academyCurriculum, academyCurriculumStats, academyYears, findAcademyLesson } from "./curriculum";

describe("BaBra AI Academy curriculum", () => {
  it("contains exactly 10 stages, 40 modules and 240 lessons", () => {
    expect(academyCurriculumStats).toEqual({ years: 10, modules: 40, lessons: 240 });
    expect(academyYears.every((year) => year.modules.length === 4)).toBe(true);
    expect(academyCurriculum.every((courseModule) => courseModule.lessons.length === 6)).toBe(true);
  });

  it("provides bilingual teaching material and assessment for every lesson", () => {
    for (const courseModule of academyCurriculum) {
      expect(courseModule.outcomes.rw.length).toBeGreaterThanOrEqual(3);
      expect(courseModule.project.rubric.rw.length).toBeGreaterThanOrEqual(4);
      expect(courseModule.resources[0]?.url).toMatch(/^https:\/\//);
      for (const lesson of courseModule.lessons) {
        expect(lesson.explanation.rw.length).toBeGreaterThan(80);
        expect(lesson.explanation.en.length).toBeGreaterThan(80);
        expect(lesson.workedExample.rw.length).toBeGreaterThan(80);
        expect(lesson.practice.en.length).toBeGreaterThan(80);
        expect(lesson.check.options.rw).toHaveLength(4);
      }
    }
  });

  it("resolves only real protected lesson identifiers", () => {
    expect(findAcademyLesson("y1-t1-l1")?.lesson.title.rw).toBe("Ibikoresho bya digital");
    expect(findAcademyLesson("y10-t4-l6")?.module.year).toBe(10);
    expect(findAcademyLesson("y11-t1-l1")).toBeNull();
  });
});

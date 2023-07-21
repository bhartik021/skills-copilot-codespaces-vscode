function skillsMember() {
    this.skills = ['HTML', 'CSS', 'JS'];
    this.addSkill = function (skill) {
        this.skills.push(skill);
    }
}